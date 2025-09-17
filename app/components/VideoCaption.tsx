"use client";
import { Stack, Text } from "@mantine/core";

interface VideoCaptionProps {
  title?: string;
  subtitle?: string;
}

export default function VideoCaption({
  title = "Your last minute help. Come Learn to Score!",
  subtitle = "Come get the thought process of VARC topper",
}: VideoCaptionProps) {
  return (
    <Stack gap={4} align="center" mt="md" px="md">
      <Text fw={700} fz={{ base: "lg", sm: "xl" }} ta="center">
        {title}
      </Text>
      <Text c="dimmed" fz={{ base: "sm", sm: "md" }} ta="center">
        {subtitle}
      </Text>
    </Stack>
  );
}
