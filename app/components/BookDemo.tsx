"use client";
import { useState } from "react";
import {
  Card,
  Stack,
  TextInput,
  Button,
  Group,
  Text,
  Badge,
} from "@mantine/core";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import axios from "axios";

export function BookDemo() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState < string | null > (null);

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!/^\d{10}$/.test(mobile)) return "Enter a valid 10-digit mobile number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Enter your email";
    if (!emailRegex.test(email)) return "Enter a valid email address";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      // NOTE: Replace "/api/consultation" with your actual Next.js API route.
      const res = await axios.post("/api/demo", { name, email, mobile });
      console.log("Success:", res.data);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Something went wrong!");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      id="consultation"
      withBorder
      radius="lg"
      shadow="sm"
      p="xl"
      style={{
        maxWidth: 980,
        margin: "80px auto",
        background: "linear-gradient(135deg,#ffffff 0%,#f4f8ff 100%)",
      }}
    >
      <Group align="stretch" gap={40} wrap="wrap" justify="space-between">
        {/* Left Info Column */}
        <Stack flex={1} gap={22} style={{ minWidth: 260, maxWidth: 360 }}>
          <Stack gap={8}>
            <Badge
              variant="light"
              color="blue"
              styles={{
                root: {
                  background: "#EAF2FF",
                  color: "#0b66ff",
                  fontWeight: 600,
                  alignSelf: 'flex-start'
                },
              }}
            >
              FREE 1-ON-1 CALL
            </Badge>
            <Text
              fw={800}
              fz={28}
              style={{ letterSpacing: -0.8, lineHeight: 1.15 }}
            >
              Get Expert Guidance.
              <br />
              Build Your CAT Strategy.
            </Text>
            <Text fz="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
              Schedule a free 15-minute call to discuss your preparation, clear your doubts, and get a personalized roadmap from a CAT expert.
            </Text>
          </Stack>

          <Stack gap={10}>
            {[
              "Personalized CAT preparation strategy",
              "Clear your specific doubts with an expert",
              "Guidance on section-wise approach",
              "Understand our unique mentorship program",
              "No-obligation, purely informational call",
            ].map((point) => (
              <Group key={point} gap={10} align="flex-start">
                <Badge
                  radius="sm"
                  variant="light"
                  styles={{
                    root: {
                      background: "#0b66ff10",
                      color: "#0b66ff",
                      padding: "4px 8px",
                      fontWeight: 600,
                    },
                  }}
                >
                  <IconCheck size={14} />
                </Badge>
                <Text fz="sm" c="gray.7" style={{ lineHeight: 1.4 }}>
                  {point}
                </Text>
              </Group>
            ))}
          </Stack>

          <Text fz={11} c="dimmed" style={{ maxWidth: 300 }}>
            No spam. No pressure. Just a helpful conversation to plan your next steps.
          </Text>
        </Stack>

        {/* Right Form Column */}
        <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 300 }}>
          <Stack gap={18}>
            <Stack gap={4}>
              <Group gap={10}>
                <Text fw={800} fz={22} style={{ letterSpacing: -0.5 }}>
                  Book Your Free Consultation
                </Text>
                {submitted && (
                  <Badge color="blue" variant="light">
                    Booked!
                  </Badge>
                )}
              </Group>
              <Text fz="sm" c="dimmed">
                Limited slots available. Reserve your spot now.
              </Text>
            </Stack>

            <Group grow align="flex-start">
              <TextInput
                label="Name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
                radius="md"
                size="md"
              />
              <TextInput
                label="WhatsApp Number"
                placeholder="10 digit number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.currentTarget.value.replace(/[^0-9]/g, ""))
                }
                maxLength={10}
                required
                radius="md"
                size="md"
              />
            </Group>

            <TextInput
              label="Email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              radius="md"
              size="md"
            />

            {error && (
              <Text size="xs" c="red" mt={4}>
                {error}
              </Text>
            )}

            {!submitted && (
              <Button
                type="submit"
                size="md"
                radius="md"
                loading={submitting}
                rightSection={<IconArrowRight size={18} />}
                styles={{
                  root: {
                    background:
                      "linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)",
                    fontWeight: 600,
                  },
                }}
              >
                {submitting ? "Booking..." : "Book Consultation Call"}
              </Button>
            )}

            {submitted && (
              <Card
                radius="md"
                p="md"
                withBorder
                style={{
                  background: "rgba(0,102,255,0.06)",
                  borderColor: "rgba(0,102,255,0.25)",
                }}
              >
                <Text fz="sm" fw={500} c="blue">
                  Thanks, {name.split(" ")[0] || "there"}! Your call is booked. We'll reach out on WhatsApp shortly.
                </Text>
              </Card>
            )}
          </Stack>
        </form>
      </Group>
    </Card>
  );
}
