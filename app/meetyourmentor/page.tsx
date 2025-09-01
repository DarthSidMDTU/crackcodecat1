"use client";
import { Container, Title, Text, Box, Stack, Image } from "@mantine/core";

export default function MeetYourMentor() {
  const scorecards = [
    { year: "2017", file: "2017.png" },
    { year: "2018", file: "2018.png" },
    { year: "2019", file: "2019.png" },
    { year: "2023", file: "2023.png" },
  ];

  return (
    <Box py={60} style={{ background: "linear-gradient(180deg, #f9fbff 0%, #ffffff 100%)" }}>
      <Container size="md">
        <Stack gap="xl">
          <Title
            order={1}
            style={{ color: "#003366", fontWeight: 900, letterSpacing: -1, lineHeight: 1.3 }}
          >
            My CAT VARC Journey: The Real Story Behind Going from Rock Bottom to 95+ Percentile
          </Title>

          <Title order={3} style={{ color: "#003366" }}>
            The Truth Behind My Transformation
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            What I'm about to share isn't another success story designed to impress you—it's the unfiltered
            reality of my eight-year struggle with CAT's most challenging section. Every claim I make is
            backed by my actual scorecards, which I'm displaying throughout this post.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            Where It All Started: Confidence Meets Reality
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            Like every CAT aspirant in 2015, I believed that good coaching plus hard work equals success. I
            enrolled with reputable institutes and followed traditional preparation methods religiously.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            CAT 2017: Reality Check—51.95 Percentile
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            My first attempt yielded 51.95 percentile in VARC despite sincere preparation. I was attempting
            roughly half the section with moderate accuracy. Convinced that strategy adjustment was the
            answer, I prepared for my next shot.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            Strategy Changes and Setbacks
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            For CAT 2018, I modified my approach—attempt more questions while maintaining similar accuracy
            levels. This seemed logical at the time.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            CAT 2018: The Lowest Point—31.92 Percentile
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            The outcome was devastating: 31.92 percentile. My strategy had completely backfired. After two
            years of effort, I was moving backward instead of forward.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            The Determination Phase
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            After hitting my lowest point, I exhausted every conventional option—premier coaching centers,
            online platforms, study materials—yet nothing delivered meaningful improvement. That's when I made
            a crucial decision:
          </Text>
          <Text size="lg" fw={600} style={{ lineHeight: 1.8, fontStyle: "italic" }}>
            "I will decode VARC completely, regardless of what it takes."
          </Text>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            I embarked on intensive research, analyzing every question pattern, elimination technique, and
            timing strategy from scratch.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            The Discovery Moment
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            Days before CAT 2019, my research culminated in what I now call the "Crack Code"—a comprehensive
            approach to VARC that no coaching institute had taught me. Skeptical but desperate, I decided to
            test it in the actual exam.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            CAT 2019: The Validation—77.33 Percentile
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            The results were remarkable: 77.33 percentile, representing a 45-percentile improvement. My
            self-developed methodology had proven effective in real exam conditions.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            Perfection Through Teaching
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            I spent the following years refining my approach and teaching it to struggling aspirants. Their
            consistent success validated my methods further.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            CAT 2023: Complete Mastery—95+ Percentile
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            Using my evolved framework, I achieved 95+ percentile in VARC. This confirmed that my methodology
            wasn't accidental—it was replicable and sustainable.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            The Key Revelation: Hidden Gaps Matter Most
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            My journey revealed that VARC success isn't about studying harder or using more materials—it's
            about identifying specific knowledge gaps that traditional preparation overlooks. These gaps are
            what separate average performers from top scorers.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            Why This Story Matters to You
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            I'm sharing my complete journey—failures included—because you deserve transparency. The eight
            years I spent discovering these insights can be compressed into 1.5 months of targeted learning
            for you.
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            My Complete Performance Record
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            • CAT 2017: 51.95 percentile <br />
            • CAT 2018: 31.92 percentile <br />
            • CAT 2019: 77.33 percentile <br />
            • CAT 2023: 95+ percentile
          </Text>

          <Title order={3} style={{ color: "#003366" }}>
            Your Opportunity Starts Now
          </Title>
          <Text size="lg" style={{ lineHeight: 1.8 }}>
            You have the chance to bypass years of frustration and failed attempts. My documented journey
            proves that dramatic improvement is possible when you address the right knowledge gaps with proven
            strategies.
          </Text>

          <Text size="lg" style={{ lineHeight: 1.8 }}>
            See my scorecards below and discover how you can replicate this transformation in just 1.5 months.
          </Text>

          {/* All Scorecards at the end */}
          {scorecards.map((sc) => (
            <Box
              key={sc.year}
              style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
            >
              <Image
                src={`/${sc.file}`}
                alt={`CAT ${sc.year} Scorecard`}
                radius="lg"
                fit="contain"
                style={{
                  boxShadow: "0 8px 64px rgba(0,0,0,0.13)",
                  width: "100%",
                  maxWidth: "900px",
                  height: "auto",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
