"use client";
import React, { useEffect, useState } from 'react';
import { Group, Container, Box, Anchor, Flex, Image, ActionIcon, Button, rem, Burger, Drawer, Stack, ScrollArea, Loader, Menu, Avatar, Text, UnstyledButton } from '@mantine/core';
import { IconBrandWhatsapp, IconPhoneCall, IconUser, IconLogout, IconChevronDown, IconFileDownload, IconChevronRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { decodeUserFromCookieClient } from '@/utils/decoder';


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      const userData = decodeUserFromCookieClient();
      if (userData && userData.name) {
        setIsLoggedIn(true);
        setUserName(userData.name);
      }
    } catch {
      setIsLoggedIn(false);
      setUserName(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/auth/signin";
  };

  const links = [

    { label: 'Course Features', href: '#features' },
    // { label: 'Mock Tests', href: '#tests' },
    // { label: 'Previous Papers', href: '#papers' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Achievers', href: '#achievers' },
    { label: 'FAQs', href: '#faqs' }

  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.startsWith('#') ? href.slice(1) : href;
    if (!id || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksMenuOpened, { toggle: toggleLinksMenu }] = useDisclosure(false);

  return (
    <Box
      component="nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        background: scrolled
          ? 'linear-gradient(90deg, rgba(6,21,55,0.95) 0%, rgba(11,44,100,0.95) 60%, rgba(17,76,168,0.95) 100%)'
          : 'linear-gradient(90deg, rgba(4,16,36,0.95) 0%, rgba(6,34,74,0.95) 55%, rgba(10,60,126,0.95) 100%)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid rgba(255,255,255,0.10)',
        boxShadow: scrolled
          ? '0 4px 18px -4px rgba(0,0,0,0.45)'
          : '0 2px 10px -4px rgba(0,0,0,0.35)',
        transition:
          'background 300ms ease, border-color 300ms ease, box-shadow 300ms ease'
      }}
      py="xs"
      px="md"
      size="lg"
    >

      <Container size="lg">
        {/* Top Row: Logo, Utility Links, Auth/User */}
        <Flex align="center" justify="space-between" h={rem(64)} style={{ gap: rem(12) }}>
          <Group gap="sm" align="center">
            <Group hiddenFrom="md" style={{ width: rem(40), justifyContent: 'flex-start' }}>
              <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" color="white" />
            </Group>
            <Anchor
  href="/"
  underline="never"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: rem(8),
    lineHeight: 1,
  }}
>
  <Image src="/company.png" alt="Company Logo" height={40} width={40} fit="contain" radius="md" />
  <span style={{
    fontWeight: 800,
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '-0.5px',
    fontSize: rem(20),
    color: '#fff',
    whiteSpace: 'nowrap'
  }}>Crack Code CAT</span>
</Anchor>

          </Group>

          <Group gap="xs" visibleFrom="md">
            {/* <Button
              variant="subtle"
              leftSection={<IconFileDownload size={18} />}
              component="a"
              href="#"
              styles={{ root: { color: '#fff', fontWeight: 600 } }}
            >
              PDF
            </Button> */}
            <ActionIcon component="a" href="https://wa.me/8744003503" target="_blank" rel="noopener noreferrer" color="green" variant="light" size="lg">
              <IconBrandWhatsapp size={24} />
            </ActionIcon>
            <ActionIcon component="a" href="tel:8744003503" color="blue" variant="light" size="lg">
              <IconPhoneCall size={24} />
            </ActionIcon>
          </Group>

          <Group>
            <Flex align="center" gap="sm">

            {loadingUser ? (
              <Loader size="sm" color="yellow" />
            ) : isLoggedIn && userName ? (
              <Menu shadow="md" width={180} position="bottom-end" withArrow>
               <Menu.Target>
  <UnstyledButton
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      borderRadius: '9999px', // fully rounded
      background: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
    }}
  >
    <Avatar color="yellow" radius="xl" size={28}>
      {userName[0]?.toUpperCase() || <IconUser size={18} />}
    </Avatar>
    <Text fw={600} size="sm" c="white" style={{ whiteSpace: 'nowrap' }}>
      {userName}
    </Text>
    <IconChevronDown size={16} color="#fff" />
  </UnstyledButton>
</Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconUser size={16} />}
                    component="a"
                    href="/profile"
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout size={16} />}
                    color="red"
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Group visibleFrom="md">
                <Button
                  component="a"
                  href="/auth/signin"
                  variant="subtle"
                  color="gray"
                  styles={{ root: { color: '#fff', fontWeight: 600 } }}
                >
                  Sign In
                </Button>
                <Button
                  component="a"
                  href="/auth/signup"
                  variant="gradient"
                  gradient={{ from: '#FFC700', to: '#FFDE55' }}
                  styles={{
                    root: {
                      fontWeight: 700,
                      color: '#0B2C64',
                      boxShadow: '0 4px 14px -2px rgba(255,199,0,0.45)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Group>
            )}
            </Flex>
          </Group>
        </Flex>

        {/* Second Row: Main Navigation Links */}
        <Flex align="center" justify="space-between" hiddenFrom="md">
          <Box style={{ width: 40 }} />
        </Flex>
        <Flex justify="center" visibleFrom="md">
          <Group gap="md">
            {links.map((link) => (
              <Anchor
                key={link.href}
                href={link.href}
                underline="never"
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: 'rgba(255,255,255,0.95)',
                  padding: '8px 14px',
                  borderRadius: 14,
                  fontSize: rem(15),
                  fontWeight: 600,
                  transition: 'background 220ms ease, transform 220ms cubic-bezier(.2,.8,.2,1)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onFocus={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onBlur={e => e.currentTarget.style.background = 'transparent'}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>
        </Flex>

      </Container>


      {/* Mobile drawer for navigation and actions */}
      <Drawer opened={drawerOpened} onClose={closeDrawer} padding="md" size={280} position="right" withCloseButton>
        <ScrollArea style={{ height: '100%' }}>
          <Stack gap="sm">
            {links.map(link => (
              <Anchor
                key={link.href}
                href={link.href}
                underline="never"
                onClick={(e) => { closeDrawer(); handleNavClick(e, link.href); }}
                style={{ fontSize: rem(16), fontWeight: 700 }}
              >
                {link.label}
              </Anchor>
            ))}
            <Menu shadow="md" width="100%" position="bottom-start" opened={linksMenuOpened} onClose={toggleLinksMenu}>
              {/* <Menu.Target> */}
                {/* <UnstyledButton onClick={toggleLinksMenu} style={{ fontSize: rem(16), fontWeight: 700, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  More <IconChevronRight size={16} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Sublink 1</Menu.Item>
                <Menu.Item>Sublink 2</Menu.Item>
              </Menu.Dropdown> */}
            </Menu>
            <Stack gap={6} mt="md">
              <Group gap={8}>
                <ActionIcon component="a" href="https://wa.me/8744003503" target="_blank" rel="noopener noreferrer" color="green" variant="light">
                  <IconBrandWhatsapp size={20} />
                </ActionIcon>
                <ActionIcon component="a" href="tel:8744003503" color="blue" variant="light">
                  <IconPhoneCall size={20} />
                </ActionIcon>
              </Group>

              {loadingUser ? (
                <Loader size="sm" color="yellow" />
              ) : isLoggedIn && userName ? (
                <>
                  <Button component="a" href="/profile" fullWidth variant="gradient" gradient={{ from: 'indigo', to: 'blue' }}>
                    Profile
                  </Button>
                  <Button onClick={handleLogout} fullWidth variant="light" color="red">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component="a" href="/auth/signin" variant="subtle" color="gray" fullWidth>
                    Sign In
                  </Button>
                  <Button component="a" href="/auth/signup" variant="gradient" gradient={{ from: '#FFC700', to: '#FFDE55' }} fullWidth>
                    Sign Up
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}