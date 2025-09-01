"use client";
import { Container, Title, Text, Box, Stack, Paper, Divider, Image } from "@mantine/core";

export default function MeetYourMentor() {
  return (
    <Box py={60} style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)" }}>
      <Container size="md">
        <Stack gap="xl">
          <Title order={1} style={{ color: "#003366", fontWeight: 900, letterSpacing: -1 }}>
            Meet Your Mentor – Abhishek Anand
          </Title>

          <Text size="lg" c="dimmed" style={{ lineHeight: 1.8, fontSize: "clamp(16px, 2vw, 20px)" }}>
            This isn’t a polished success story—it’s the real journey of my eight-year battle with CAT VARC. From crushing setbacks to breakthrough moments, every lesson I share is backed by real scorecards and relentless effort.
          </Text>

          <Divider label="My CAT VARC Journey" labelPosition="center" />

          {/* 2017 */}
          <Paper shadow="md" p="xl" radius="lg" withBorder style={{ background: "#fff" }}>
            <Text size="lg" style={{ lineHeight: 1.7 }}>
              <strong>2015:</strong> Like every aspirant, I believed good coaching and hard work would guarantee success.
              But reality struck in <strong>CAT 2017</strong>—despite sincere preparation, I scored just <strong>51.95 percentile</strong> in VARC.
              It was humbling, but I wasn’t ready to give up.
            </Text>
          </Paper>

          {/* 2018 */}
          <Paper shadow="md" p="xl" radius="lg" withBorder style={{ background: "#fff" }}>
            <Text size="lg" style={{ lineHeight: 1.7 }}>
              <strong>2018:</strong> My second attempt was even tougher. After two years of effort, my score dropped to <strong>31.92 percentile</strong>.
              I hit rock bottom. Self-doubt crept in, but so did a burning curiosity—what was I missing?
            </Text>
          </Paper>

          {/* 2019 */}
          <Paper shadow="md" p="xl" radius="lg" withBorder style={{ background: "#fff" }}>
            <Text size="lg" style={{ lineHeight: 1.7 }}>
              <strong>2019:</strong> I started researching everything—question patterns, elimination techniques, timing strategies.
              I built my own “Crack Code” and tested it in CAT 2019. The result? <strong>77.33 percentile</strong>.
              A leap of 45 points, and proof that a new approach was working.
            </Text>
          </Paper>

          {/* 2023 */}
          <Paper shadow="md" p="xl" radius="lg" withBorder style={{ background: "#fff" }}>
            <Text size="lg" style={{ lineHeight: 1.7 }}>
              <strong>2023:</strong> Years of refinement and helping others proved my method was replicable.
              By CAT 2023, I finally broke through to <strong>95+ percentile</strong>.
              My framework wasn’t accidental—it was built, tested, and perfected over time.
            </Text>
          </Paper>

          <Divider label="The Revelation" labelPosition="center" />

          <Text size="lg" c="dimmed" style={{ lineHeight: 1.8, fontSize: "clamp(16px, 2vw, 20px)" }}>
            The biggest insight? VARC success isn’t about working harder—it’s about uncovering and addressing <strong>hidden knowledge gaps</strong>. That’s what separates average performers from top scorers.
          </Text>

          <Divider label="Your Opportunity" labelPosition="center" />

          <Text size="lg" style={{ lineHeight: 1.8, fontWeight: 500 }}>
            My eight-year journey can be compressed into <strong>45 days of focused learning</strong> for you. With the right strategies, you can bypass years of trial and error. Let’s walk this path together—and make your CAT VARC story one of mastery, not mystery.
          </Text>

          {/* One image per row, all enlarged */}
          <Divider label="Scorecards" labelPosition="center" mt={40} mb={20} />
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 32 }}>
            <Image
              src="/2017.png"
              alt="CAT 2017 Marksheet"
              radius="lg"
              fit="contain"
              h={840}
              w={800}
              style={{ boxShadow: "0 8px 64px rgba(0,0,0,0.13)" }}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 32 }}>
            <Image
              src="/2018.png"
              alt="CAT 2018 Marksheet"
              radius="lg"
              fit="contain"
              h={840}
              w={800}
              style={{ boxShadow: "0 8px 64px rgba(0,0,0,0.13)" }}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 32 }}>
            <Image
              src="/2019.png"
              alt="CAT 2019 Marksheet"
              radius="lg"
              fit="contain"
              h={840}
              w={800}
              style={{ boxShadow: "0 8px 64px rgba(0,0,0,0.13)" }}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 32 }}>
            <Image
              src="/2023.png"
              alt="CAT 2023 Marksheet"
              radius="lg"
              fit="contain"
              h={840}
              w={800}
              style={{ boxShadow: "0 8px 64px rgba(0,0,0,0.13)" }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
