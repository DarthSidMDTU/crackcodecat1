"use client";
import { useState, useEffect } from 'react';
import { Paper, Text, Title, Button, Group, Container, Grid, Avatar, Badge, Stack, ActionIcon, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';

const testimonials = [
  {

    name: "Pooja",
    score: "CAT 99.12",
    quote: "The reading strategies were a revelation. My RC accuracy jumped from 50% to over 90%—it felt easy after the masterclass.",
    percentile: "95"
  },
  {
    name: "Harsh",
    score: "CAT 98.3",
    quote: "Speed reading and option elimination changed my approach completely. VARC moved from my weakest to my strongest section.",
    percentile: "94"
  },
  {
    name: "Nikhil",
    score: "CAT 97.7",
    quote: "RC doubt clearing sessions helped me get unstuck and stay confident. I finally enjoyed tackling passages!",
    percentile: "93"
  },
  {
    name: "Maya",
    score: "CAT 99.05",
    quote: "The personalized guidance for Reading Comprehension was fantastic. I started scoring 95+ in VARC after struggling for months.",
    percentile: "95"
  },
  {
    name: "Divya",
    score: "CAT 98.85",
    quote: "Shortcut techniques and mentor's insights helped me finish the RCs efficiently and accurately in actual CAT.",
    percentile: "94"

  }
];

const studentAchievers = [
  {
    name: "Ishita Mehra",
    score: "CAT 99.45%ile",
    avatar: "/1.jpg",
  },
  {
    name: "Rohan Gupta",
    score: "CAT 99.11%ile",
    avatar: "/2.jpg",
  },
  {
    name: "Neha Verma",
    score: "CAT 98.76%ile",
    avatar: "/3.jpg",
  },
  {
    name: "Kunal Singh",
    score: "CAT 98.25%ile",
    avatar: "/4.jpg",
  },
];

export function SuccessStoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  const handleNextClick = () => {
    nextTestimonial();
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000); // Change testimonial every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying) return;
    
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Resume auto-play after 10 seconds

    return () => clearTimeout(timeout);
  }, [isAutoPlaying, currentIndex]);

  return (
    <Container size="lg" py={isMobile ? 10 : 16}>
      <Grid gutter={isMobile ? 16 : 32} align="center">
        {/* Left Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap={22}>
            <div>
              <Title 
                order={1} 
                size="h1"
                style={{
                  fontSize: isMobile ? 'clamp(1.6rem, 5.2vw, 2.6rem)' : 'clamp(2rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                <Text component="span" c="blue.6" inherit>540+</Text>{' '}
                Of Our Students Scored{' '}
                <Text component="span" c="blue.6" inherit>95+%ile</Text>{' '}
                in CAT
              </Title>
              <Text size={isMobile ? 'sm' : 'md'} c="dimmed" mt={isMobile ? 8 : 12}>
                You can be the next....
              </Text>
            </div>

            <Group gap={isMobile ? 10 : 14}>
              <Button
                component="a"
                href="/payment"
                size={isMobile ? 'sm' : 'lg'}
                radius="md"
                style={{ width: 'fit-content', fontSize: isMobile ? 13 : undefined }}
              >
                Enroll Now →
              </Button>
            </Group>

            {/* Student Achievers Grid */}
            <Paper p={isMobile ? 10 : 14} radius="md" shadow="sm" bg="white">
              <Grid gutter={isMobile ? 8 : 12}>
                {studentAchievers.map((student, index) => (
                  <Grid.Col span={{ base: 6, sm: 3 }} key={index}>
                    <Group gap={10} align="center">
                      <Avatar 
                        src={student.avatar} 
                        size={36}
                        radius="xl"
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text size="sm" fw={600} truncate>
                          {student.name}
                        </Text>
                        <Text size="xs" c="blue.6" fw={500}>
                          {student.score}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Section - Vertical Testimonial Carousel */}
        <Grid.Col span={{ base: 12, md: 6 }}>
            <div style={{ position: 'relative', height: isMobile ? 320 : 360, marginTop: isMobile ? 48 : 0, zIndex: isMobile ? -1 : 1 }}>
            {/* Testimonials Stack */}
            <Stack gap="md" style={{ height: '100%', justifyContent: 'center', padding: isMobile ? '28px 12px' : '36px 16px' }}>
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentIndex + 1) % testimonials.length;
                
                if (!isActive && !isPrev && !isNext) return null;
                
                return (
                  <Paper 
                    key={index}
                    p={16} 
                    radius="md" 
                    shadow={isActive ? "lg" : "sm"}
                    bg="white"
                    style={{ 
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'scale(1)' : 'scale(0.95)',
                      transition: 'all 0.3s ease',
                      border: isActive ? '2px solid #228be6' : '1px solid #e9ecef',
                    }}
                  >
                    <Group gap={15} mb={15} align="center">
                      <Badge 
                        size="lg" 
                        radius="xl" 
                        variant="light" 
                        color="blue"
                        style={{ 
                          height: 36, 
                          width: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '15px',
                          fontWeight: 700
                        }}
                      >
                        {testimonial.percentile}
                      </Badge>
                      <div>
                        <Title order={4} size="h5">
                          {testimonial.name}
                        </Title>
                        <Text size="sm" c="dimmed">
                          ({testimonial.score})
                        </Text>
                      </div>
                    </Group>
                    
                    <Text size="sm" lh={1.4}>
                      {testimonial.quote}
                    </Text>
                  </Paper>
                );
              })}
            </Stack>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
