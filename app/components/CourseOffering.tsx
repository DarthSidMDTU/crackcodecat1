"use client";
import { Box, Container, Title, Text, Paper, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconTargetArrow, IconChalkboard, IconHelp, IconAward, IconClock, IconListCheck, IconBook2, IconCalendarTime, IconVideo } from '@tabler/icons-react';


const features = [
  {
    icon: <IconTargetArrow size={36} color="#0066FF" />, title: 'Strategic Elimination',
    desc: 'Signature "Math Problem Option" technique to pick answers with high accuracy.'
  },
  {
    icon: <IconChalkboard size={36} color="#FF7A00" />, title: 'Speed-Reading',
    desc: 'Analysis-based speed reading to spot key info and eliminate wrong options.'
  },
  {
    icon: <IconHelp size={36} color="#E64980" />, title: 'Shortcut Techniques',
    desc: 'Practical shortcuts: when to skip, when to guess, and how to save time.'
  },
  {
    icon: <IconAward size={36} color="#FFC700" />, title: 'Doubt Support',
    desc: 'Live doubt resolution during sessions so no confusion carries forward.'
  },
  {
    icon: <IconListCheck size={36} color="#4C6EF5" />, title: 'Handpicked Resources',
    desc: 'Curated practice sets and focused strategies for efficient practice.'
  },
  {
    icon: <IconBook2 size={36} color="#FFA94D" />, title: 'Para-Based Tactics',
    desc: 'Clear methods for Para Jumbles, Completions, and Summary questions.'
  },
  {
    icon: <IconCalendarTime size={36} color="#228BE6" />, title: 'Mentor Insights',
    desc: 'Mentor tips from a 9-year journey from below 70 to 95+ percentile.'
  },
  {
    icon: <IconVideo size={36} color="#FA5252" />, title: 'Daily Live Classes',
    desc: 'Daily live classes (Mon–Fri, 8pm) led by CAT top scorers.'
  },
];

export function CourseOffering() {
  return (
    <Box component="section" id="features" py={{ base: 32, md: 64 }} style={{ background: '#f8faff' }}>
      <Container size="lg">
        <Title order={2} size={36} fw={900} mb={24} ta="center" style={{ color: '#003366', letterSpacing: -1, fontSize: 'clamp(20px, 5.5vw, 36px)' }}>
          Course Features
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={20}>
          {features.map((f, i) => (
            <Paper key={i} shadow="md" radius={16} p={20} style={{ background: '#fff', border: '1.5px solid #e3e8f0', minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              withBorder
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,102,255,0.08)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '')}
            >
              <ThemeIcon size={40} radius={16} mb={12} style={{ background: '#f4f8ff' }}>{f.icon}</ThemeIcon>
              <Title order={4} style={{ fontWeight: 700, fontSize: 'clamp(16px,3.6vw,20px)', marginBottom: 6, color: '#222' }}>{f.title}</Title>
              <Text size="sm" style={{ color: '#444', fontSize: 'clamp(13px,3.2vw,15px)' }}>{f.desc}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
