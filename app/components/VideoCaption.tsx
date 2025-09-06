"use client";
import { Stack, Text } from "@mantine/core";

interface VideoCaptionProps {
  title?: string;
  subtitle?: string;
}

export default function VideoCaption({
  title = "Keep building. Keep moving.",
  subtitle = "Small consistent steps today become the breakthroughs tomorrow.",
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
