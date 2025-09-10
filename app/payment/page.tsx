"use client";
import axios from "axios";
import Script from "next/script";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  Stack,
  Text,
  Group,
  Button,
  Divider,
  LoadingOverlay,
  ThemeIcon,
  Loader,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconShieldCheck, IconLock, IconArrowRight } from "@tabler/icons-react";
import { Document } from "mongoose";
import { useUser } from "@/hooks/getuser";
import { useRouter } from "next/navigation";

interface Course extends Document {
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
}

declare global {
  interface Window {
    Instamojo: any; // or specify the correct type if you know it
  }
}

export default function Payment() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course>();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    // If user fetching is done and there's no user, redirect to login
    if (!userLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, userLoading, router]);

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.Instamojo) {
      // Configure handlers like onOpen, onClose, onSuccess, onFailure here
      window.Instamojo.configure({
        onOpen: () => {
          console.log("Checkout opened");
          setPaymentProcessing(true);
        },
        onClose: () => {
          console.log("Checkout closed");
        },
        onSuccess: async (data: any) => {
          console.log("Payment successful", data);
          setPaymentProcessing(true);

          const {payment_id,payment_request_id} = data; // Extract payment ID

          const intervalId = setInterval(async () => {
            try {
              // Poll your backend to verify payment status using paymentId
              const res = await axios.post("/api/purchase/verify", {
                payment_id,
                payment_request_id
              });

              if (res.status === 200 && res.data.status === "success") {
                clearInterval(intervalId); // Stop polling on success
                setPaymentProcessing(false);
                router.push("/success"); // Redirect to dashboard
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              // Optionally clear interval or handle retries/failures here
            }
          }, 3000);

          // Optional: stop polling after a max time (e.g. 2 minutes)
          setTimeout(() => {
            clearInterval(intervalId);
            setPaymentProcessing(false);
            setError(`confirmation not received, check your profile after sometime\n
      your payment id is ${payment_id}`);
            // Optionally show a timeout/error message if no confirmation received
          }, 2 * 60 * 1000);
        },

        onFailure: (data: any) => {
          console.error("Payment failed", data);
          setError("Payment failed, please try again");
          // Show error or redirect to retry payment page
        },
      });
    }
  }, []);

  const breakdown = useMemo(() => {
    if (!course) return { total: 0 };
    return {
      total: course.price,
    };
  }, [course]);

  const handlePay = async () => {
    setError(null);
    setPaymentProcessing(true);
    console.log("sending this");
    console.log(course?._id);
    console.log(user?.userId);

    try {
      const orderRes = await axios.post("/api/purchase/initiate", {
        courseId: course?._id,
        userId: user?.userId,
      });

      const paymentUrl = orderRes.data.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error("Could not create payment link.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || "Could not initiate payment.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const summaryCard = (
    <Card
      withBorder
      radius="md"
      p="xl"
      style={{
        flex: 1,
        minWidth: 300,
        background: "linear-gradient(45deg, #e3f2fd, #f1f6fc)",
      }}
    >
      <Stack gap={isMobile ? 18 : 24}>
        <Text fw={700} fz={20}>
          Order Summary
        </Text>
        <Stack gap={10}>
          <Text fw={700} fz="md" c="dimmed">
            {course?.courseName || "Course Name"}
          </Text>
          <Divider />
          <Group justify="space-between" mt="md">
            <Text fw={700} fz="xl" c="blue.6">
              Total Payable
            </Text>
            <Text
              fw={800}
              fz={32}
              style={{ letterSpacing: -0.5, color: "#0b66ff" }}
            >
              ₹{breakdown.total.toLocaleString("en-IN")}
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

  // Show a full-page loader while checking user status before redirecting
  if (userLoading || !user) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  }

  const userInfoAndActionCard = (
    <Card
      withBorder
      radius="md"
      p="xl"
      style={{ flex: 1, minWidth: 300, position: "relative" }}
    >
      <Stack gap="xl">
        <Stack gap="md">
          <Text fw={700} fz={20}>
            Your Details
          </Text>
          <Stack gap={4}>
            <Text fz="xs" tt="uppercase" c="dimmed" fw={600}>
              Full Name
            </Text>
            <Text fw={500}>{user.name}</Text>
          </Stack>
          <Stack gap={4}>
            <Text fz="xs" tt="uppercase" c="dimmed" fw={600}>
              Email
            </Text>
            <Text fw={500}>{user.email}</Text>
          </Stack>
        </Stack>

        {error && (
          <Text fz="sm" c="red">
            {error}
          </Text>
        )}

        <Button
          size="lg"
          radius="md"
          fullWidth
          loading={paymentProcessing}
          rightSection={<IconArrowRight size={20} />}
          styles={{
            root: {
              background: "linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)",
              fontWeight: 600,
            },
          }}
          onClick={handlePay}
        >
          Pay Now
        </Button>
        <Text fz={11} c="dimmed" ta="center">
          By proceeding you agree to our Terms & Refund Policy.
        </Text>
      </Stack>
    </Card>
  );

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        p="xl"
        style={{
          maxWidth: 860,
          margin: "40px auto 80px",
          background: "linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)",
          position: "relative",
        }}
      >
        <LoadingOverlay
          visible={paymentProcessing}
          zIndex={40}
          overlayProps={{ bg: "#ffffffaa", blur: 2 }}
        />
        <Stack gap={32}>
          <Stack gap={4}>
            <Text fw={800} fz={30} style={{ letterSpacing: -0.8 }}>
              Secure Checkout
            </Text>
            <Text fz="sm" c="dimmed">
              Enroll now to unlock live mentorship, adaptive practice, and the
              full mock stack instantly.
            </Text>
          </Stack>
          {isMobile ? (
            <Stack>
              {summaryCard}
              {userInfoAndActionCard}
            </Stack>
          ) : (
            <Group
              align="flex-start"
              gap={50}
              wrap="nowrap"
              justify="space-between"
            >
              {userInfoAndActionCard}
              {summaryCard}
            </Group>
          )}
        </Stack>
      </Card>
    </>
  );
}
