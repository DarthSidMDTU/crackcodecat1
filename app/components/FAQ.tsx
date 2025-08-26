"use client";
import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Box, Drawer, Group, Anchor, ScrollArea, Stack, Button, Paper } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

const FAQ_ITEMS = [
  {
    id: 'q1',
    question: 'What is CAT Exam?',
    answer:
      'CAT is a nationwide examination administered by the Indian Institutes of Management (IIMs) to select candidates for admission into various management programs. Besides the IIMs, many other top MBA colleges in India accept the CAT Score, such as FMS Delhi, SPJIMR, MDI, JBIMS, IIT-MBAs, IMT Ghaziabad, and others. CAT tests aptitude, logical reasoning, reading comprehension, and time management, which are essential for future managers.'
  },
  {
    id: 'q2',
    question: 'Is 6 months enough for CAT coaching?',
    answer:
      'Yes, it is possible to prepare in 6 months, but it depends on your starting point. If you need to build basics, 8-10 months is ideal. If you already have a strong foundation or scored well previously (e.g., 90+ percentile), 6 months can be more than sufficient.'
  },
  {
    id: 'q3',
    question: 'What are the fees for CAT coaching online?',
    answer:
      'The fees for Cracku’s CAT online coaching range from INR 17,999 to 24,999 depending on the course. For other institutes, it generally ranges between INR 29,999 and 45,999. Cracku is known for CAT-level question quality, concept clarity, and good ROI.'
  },
  {
    id: 'q4',
    question: 'Is online coaching good for CAT?',
    answer:
      'Yes, online coaching is highly effective for aspirants who want to save time and money. It is ideal for college students and working professionals as it allows flexibility, recorded sessions for revision, and easy access to study material.'
  },
  {
    id: 'q5',
    question: 'What is the Syllabus for CAT and Other MBA Exams in 2025?',
    answer:
      'CAT 2025 has three main sections: VARC (Reading Comprehension, Parajumbles, Odd Sentence), DILR (Seating Arrangements, Venn Diagrams, Data Charts), and QA (Arithmetic, Algebra, Geometry, Probability, etc.). NMAT, SNAP, and XAT have similar sections but with additional topics like General Knowledge for XAT and Grammar-focused questions for NMAT and SNAP.'
  },
  {
    id: 'q6',
    question: 'What is CAT Score Vs Percentile for CAT 2024?',
    answer:
      'CAT 2024 score vs percentile example: 99.9 percentile ≈ 127 marks, 99 percentile ≈ 95 marks, 95 percentile ≈ 70 marks, 90 percentile ≈ 58 marks, 80 percentile ≈ 44 marks.'
  },
  {
    id: 'q7',
    question: 'How many MBA Seats are there in IIMs?',
    answer:
      'There are about 21 IIMs in India. Top IIMs like Ahmedabad, Bangalore, and Calcutta offer 400–500+ seats each, while newer IIMs have 200–400 seats. Overall, thousands of MBA seats are available across all IIMs combined.'
  },
  {
    id: 'q8',
    question: 'What are the important topics for CAT 2025?',
    answer:
      'For Quantitative Ability: Arithmetic, Algebra, Geometry, and Number Properties. For VARC: Reading Comprehension, Para Jumbles, Sentence Correction, and Grammar. For LRDI: Seating Arrangements, Tables, Puzzles, and Data Interpretation through graphs and charts.'
  },
  {
    id: 'q9',
    question: 'Which is better CAT online coaching or CAT offline coaching?',
    answer:
      'According to many toppers, online coaching is better as it offers flexibility, self-paced learning, and cost-effectiveness. It saves travel time and expenses while allowing access to recorded sessions for revision.'
  }
];



export function FAQ() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Force the desktop order/row layout exactly as requested
  const ORDERED_IDS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'];
  const ORDERED_FAQ = ORDERED_IDS.map((id) => FAQ_ITEMS.find((f) => f.id === id)!).filter(Boolean);

  const mdSpanForIndex = (i: number) => {
    // Row 1: 0..2 -> 3 items -> md=4 each
    if (i <= 2) return 4;
    // Row 2: 3..4 -> 2 items -> md=6 each
    if (i <= 4) return 6;
    // Row 3: 5..6 -> 2 items -> md=6 each
    if (i <= 6) return 6;
    // Row 4: 7..8 -> 2 items -> md=6 each
    return 6;
  };

  useEffect(() => {
    if (open && active) {
      // small timeout ensures drawer content is rendered before scrolling
      setTimeout(() => {
        const el = document.getElementById(`answer-${active}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [open, active]);

  const handleOpen = (id: string) => {
    setActive(id);
    setOpen(true);
  };

  return (
    <Box component="section" id="faqs" py={48} style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)' }}>
      <Container size="lg">
        <Title  order={2} mb={6} style={{ color: '#0b66ff', letterSpacing: -0.2 }}>Frequently Asked Questions</Title>
  <Box style={{ display: 'flex', flexWrap: 'wrap', columnGap: 24, rowGap: 8, alignItems: 'center' }}>
          {ORDERED_FAQ.map((it, i) => (
            <React.Fragment key={it.id}>
              <Paper
                role="button"
                tabIndex={0}
                onClick={() => handleOpen(it.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen(it.id)}
                withBorder
                radius={0}
                style={{
                  cursor: 'pointer',
                  background: '#fff',
                  border: '1px solid #d1d5db',
                  padding: '14px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 56,
                  width: 'auto',
                  maxWidth: '100%'
                }}
              >
                <Text fw={600} style={{ color: '#1f2937', lineHeight: 1.35 }}>
                  {it.question}
                </Text>
                <Box aria-hidden style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb'
                }}>
                  <IconChevronRight size={14} color="#6b7280" />
                </Box>
              </Paper>
              {(i === 2 || i === 4 || i === 6) && (
                <span style={{ flexBasis: '100%', height: 0, margin: 0, padding: 0, display: 'block' }} />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Drawer opened={open} onClose={() => setOpen(false)} position="right" size="lg" title="FAQ Answers">
          <Stack gap={10}>
            <Group gap={8} wrap="wrap" style={{ paddingBottom: 6 }}>
              {FAQ_ITEMS.map((it) => (
                <Anchor
                  key={it.id}
                  href={`#answer-${it.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(it.id);
                    const el = document.getElementById(`answer-${it.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  c="#0b66ff"
                  underline="never"
                  style={{
                    background: 'rgba(11,102,255,0.10)',
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600
                  }}
                >
                  {it.question}
                </Anchor>
              ))}
            </Group>

            <ScrollArea style={{ height: '65vh' }}>
              <Stack gap={18}>
                {FAQ_ITEMS.map((it) => (
                  <Box key={it.id} id={`answer-${it.id}`}>
                    <Title order={4} mb={6}>{it.question}</Title>
                    <Text c="dimmed">{it.answer}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
            <Group align="center" style={{ justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </Group>
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
}

export default FAQ;
