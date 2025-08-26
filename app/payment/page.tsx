"use client"
import axios from "axios";
import Script from "next/script";
import { useState, useMemo, useEffect } from 'react';
import { Card, Stack, Text, Group, Button, Divider, Badge, TextInput, LoadingOverlay, ThemeIcon, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconShieldCheck, IconLock, IconArrowRight } from '@tabler/icons-react';
import { Document } from "mongoose";

interface Course extends Document {
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
}

export default function Payment() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("/api/courses/");
        setCourse(res.data.courses[0]);
      } catch (err) {
        console.error("Failed to fetch course", err);
        setError("Could not load course details. Please try again later.");
      }
    };
    fetchCourse();
  }, []);

  const breakdown = useMemo(() => {
    if (!course) return { total: 0 };
    return {
      total: course.price,
    };
  }, [course]);

  const valid = custName.trim() && /\S+@\S+\.\S+/.test(custEmail) && /^\d{10}$/.test(custPhone);

  const handlePay = async () => {
    if (!valid) {
      setError('Enter valid name, email & 10-digit mobile number.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const orderRes = await axios.post("/api/purchase/initiate", {
        course_Id: course?.id,
        name: custName,
        email: custEmail,
        phone: custPhone,
      });

      const paymentUrl = orderRes.data.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error("Could not create payment link.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || 'Could not initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  const formCard = (
    <Card withBorder radius="md" p="xl" style={{ flex: 1, minWidth: 300, position: 'relative' }}>
      <Stack gap={isMobile ? 24 : 32}>
        <Text fw={700} fz={20}>Your Details</Text>
        <Stack gap={16}>
          <TextInput
            label="Full Name"
            placeholder="Enter name"
            value={custName}
            onChange={e => setCustName(e.currentTarget.value)}
            required
            radius="md"
            size="md"
          />
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={custEmail}
            onChange={e => setCustEmail(e.currentTarget.value)}
            required
            radius="md"
            size="md"
          />
          <TextInput
            label="Mobile"
            placeholder="10 digit"
            value={custPhone}
            onChange={e => setCustPhone(e.currentTarget.value.replace(/[^0-9]/g, ''))}
            maxLength={10}
            required
            radius="md"
            size="md"
          />
        </Stack>
        {error && <Text fz="sm" c="red">{error}</Text>}
        <Button
          size="lg"
          radius="md"
          fullWidth
          disabled={!valid || loading}
          loading={loading}
          rightSection={<IconArrowRight size={20} />}
          styles={{ root: { background: 'linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)', fontWeight: 600 } }}
          onClick={handlePay}
        >
          Pay Now
        </Button>
        <Text fz={11} c="dimmed" ta="center">By proceeding you agree to our Terms & Refund Policy.</Text>
      </Stack>
    </Card>
  );

  const summaryCard = (
    <Card withBorder radius="md" p="xl" style={{ flex: 1, minWidth: 300, background: 'linear-gradient(45deg, #e3f2fd, #f1f6fc)' }}>
      <Stack gap={isMobile ? 18 : 24}>
        <Text fw={700} fz={20}>Order Summary</Text>
        <Stack gap={10}>
          <Text fw={700} fz="md" c="dimmed">{course?.courseName || 'Course Name'}</Text>
          <Divider />
          <Group justify="space-between" mt="md">
            <Text fw={700} fz="xl" c="blue.6">Total Payable</Text>
            <Text fw={800} fz={32} style={{ letterSpacing: -0.5, color: '#0b66ff' }}>
              ₹{breakdown.total.toLocaleString('en-IN')}
            </Text>
          </Group>
        </Stack>

        <Stack gap={10} mt="xl">
          <Group gap={8} align="flex-start">
            <ThemeIcon size={34} radius="md" variant="light" color="blue">
              <IconShieldCheck size={18} />
            </ThemeIcon>
            <Text fz="sm" c="dimmed" style={{ flex: 1 }}>
              100% secure encrypted payment • Instant activation
            </Text>
          </Group>
          <Group gap={8} align="flex-start">
            <ThemeIcon size={34} radius="md" variant="light" color="blue">
              <IconLock size={18} />
            </ThemeIcon>
            <Text fz="sm" c="dimmed" style={{ flex: 1 }}>
              We do not store your card data on our servers
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        p="xl"
        style={{
          maxWidth: 860,
          margin: '40px auto 80px',
          background: 'linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)',
          position: 'relative'
        }}
      >
        <LoadingOverlay visible={loading} zIndex={40} overlayProps={{ bg: '#ffffffaa', blur: 2 }} />
        <Stack gap={32}>
          <Stack gap={4}>
            <Group gap={10}>
              <Text fw={800} fz={30} style={{ letterSpacing: -0.8 }}>Secure Checkout</Text>
            </Group>
            <Text fz="sm" c="dimmed">
              Enroll now to unlock live mentorship, adaptive practice, and the full mock stack instantly.
            </Text>
          </Stack>

          {isMobile ? (
            <Stack>
              {summaryCard}
              {formCard}
            </Stack>
          ) : (
            <Group align="flex-start" gap={50} wrap="nowrap" justify="space-between">
              {formCard}
              {summaryCard}
            </Group>
          )}
        </Stack>
      </Card>
    </>
  );
}