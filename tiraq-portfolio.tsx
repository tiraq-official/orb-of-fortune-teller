import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Terminal,
  Cpu,
  Smartphone,
  Code2,
  GitBranch,
  Layers,
  Shield,
  Sparkles,
  Gamepad2,
  Flag,
  Headphones,
  HeartHandshake,
  ExternalLink,
  Search,
  LayoutGrid,
  List,
  Sun,
  Moon,
  Palette,
  X,
  ArrowUpRight,
  Github,
  Send,
  Tv,
  Check,
  ChevronRight,
  Wrench,
  Menu,
  FolderGit2,
  Volume2,
  HardDrive,
} from 'lucide-react';

type SeedTheme = 'violet' | 'teal' | 'amber' | 'emerald';
type FilterCategory =
  | 'All'
  | 'fogos-5-4'
  | 'Device & Vendor'
  | 'Audio & Apps'
  | 'Kernel & System'
  | 'Linux & Ricing';
type ViewMode = 'grid' | 'list';

interface Project {
  id: string;
  title: string;
  org: 'fogos-5-4' | 'tiraq-official';
  badge: string;
  category: Exclude<FilterCategory, 'All' | 'fogos-5-4'>;
  language: string;
  description: string;
  url: string;
  highlights: string[];
}

interface Interest {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  tone: 'primary' | 'secondary' | 'tertiary' | 'surface';
  span: string;
}

interface SkillGroup {
  id: string;
  label: string;
  tagline: string;
  subtitle: string;
  items: { name: string; note: string }[];
  icon: React.ReactNode;
}

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  tone: 'primary' | 'secondary' | 'tertiary' | 'surface';
}

interface ThemePalette {
  name: string;
  swatch: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

const MD3_PALETTES: Record<SeedTheme, ThemePalette> = {
  violet: {
    name: 'M3 Violet',
    swatch: '#6750A4',
    light: {
      '--md-primary': '#6750A4',
      '--md-on-primary': '#FFFFFF',
      '--md-primary-container': '#EADDFF',
      '--md-on-primary-container': '#21005D',
      '--md-secondary': '#625B71',
      '--md-on-secondary': '#FFFFFF',
      '--md-secondary-container': '#E8DEF8',
      '--md-on-secondary-container': '#1D192B',
      '--md-tertiary': '#7D5260',
      '--md-on-tertiary': '#FFFFFF',
      '--md-tertiary-container': '#FFD8E4',
      '--md-on-tertiary-container': '#31111D',
      '--md-surface': '#FEF7FF',
      '--md-surface-container-lowest': '#FFFFFF',
      '--md-surface-container-low': '#F7F2FA',
      '--md-surface-container': '#F3EDF7',
      '--md-surface-container-high': '#ECE6F0',
      '--md-surface-container-highest': '#E6E0E9',
      '--md-on-surface': '#1D1B20',
      '--md-on-surface-variant': '#49454F',
      '--md-outline': '#79747E',
      '--md-outline-variant': '#CAC4D0',
    },
    dark: {
      '--md-primary': '#D0BCFF',
      '--md-on-primary': '#381E72',
      '--md-primary-container': '#432D78',
      '--md-on-primary-container': '#EADDFF',
      '--md-secondary': '#CCC2DC',
      '--md-on-secondary': '#332D41',
      '--md-secondary-container': '#3B3647',
      '--md-on-secondary-container': '#E8DEF8',
      '--md-tertiary': '#EFB8C8',
      '--md-on-tertiary': '#492532',
      '--md-tertiary-container': '#54323E',
      '--md-on-tertiary-container': '#FFD8E4',
      '--md-surface': '#111015',
      '--md-surface-container-lowest': '#0C0B0F',
      '--md-surface-container-low': '#18161C',
      '--md-surface-container': '#1E1C23',
      '--md-surface-container-high': '#27242D',
      '--md-surface-container-highest': '#312E38',
      '--md-on-surface': '#EDE8F2',
      '--md-on-surface-variant': '#B8B2C2',
      '--md-outline': '#7E7887',
      '--md-outline-variant': '#2E2B36',
    },
  },
  teal: {
    name: 'Pixel Teal',
    swatch: '#006A6A',
    light: {
      '--md-primary': '#006A6A',
      '--md-on-primary': '#FFFFFF',
      '--md-primary-container': '#9CF1F0',
      '--md-on-primary-container': '#002020',
      '--md-secondary': '#4A6363',
      '--md-on-secondary': '#FFFFFF',
      '--md-secondary-container': '#CCE8E7',
      '--md-on-secondary-container': '#051F1F',
      '--md-tertiary': '#4B607C',
      '--md-on-tertiary': '#FFFFFF',
      '--md-tertiary-container': '#D3E4FF',
      '--md-on-tertiary-container': '#041C35',
      '--md-surface': '#F4FBF9',
      '--md-surface-container-lowest': '#FFFFFF',
      '--md-surface-container-low': '#EFF5F4',
      '--md-surface-container': '#E9EFEE',
      '--md-surface-container-high': '#E3E9E8',
      '--md-surface-container-highest': '#DDE4E2',
      '--md-on-surface': '#161D1D',
      '--md-on-surface-variant': '#3F4948',
      '--md-outline': '#6F7979',
      '--md-outline-variant': '#BEC9C8',
    },
    dark: {
      '--md-primary': '#80D5D4',
      '--md-on-primary': '#003737',
      '--md-primary-container': '#084747',
      '--md-on-primary-container': '#9CF1F0',
      '--md-secondary': '#B0CCCB',
      '--md-on-secondary': '#1B3534',
      '--md-secondary-container': '#283E3E',
      '--md-on-secondary-container': '#CCE8E7',
      '--md-tertiary': '#B3C8E8',
      '--md-on-tertiary': '#1C314B',
      '--md-tertiary-container': '#2B3E57',
      '--md-on-tertiary-container': '#D3E4FF',
      '--md-surface': '#0D1313',
      '--md-surface-container-lowest': '#080D0D',
      '--md-surface-container-low': '#141B1B',
      '--md-surface-container': '#192121',
      '--md-surface-container-high': '#222A2A',
      '--md-surface-container-highest': '#2B3434',
      '--md-on-surface': '#E2EAE8',
      '--md-on-surface-variant': '#AEBBBB',
      '--md-outline': '#768281',
      '--md-outline-variant': '#263030',
    },
  },
  amber: {
    name: 'Terracotta',
    swatch: '#8B5000',
    light: {
      '--md-primary': '#8B5000',
      '--md-on-primary': '#FFFFFF',
      '--md-primary-container': '#FFDCBE',
      '--md-on-primary-container': '#2C1600',
      '--md-secondary': '#735A42',
      '--md-on-secondary': '#FFFFFF',
      '--md-secondary-container': '#FFDCBE',
      '--md-on-secondary-container': '#291806',
      '--md-tertiary': '#596339',
      '--md-on-tertiary': '#FFFFFF',
      '--md-tertiary-container': '#DDE9B3',
      '--md-on-tertiary-container': '#171E00',
      '--md-surface': '#FFF8F4',
      '--md-surface-container-lowest': '#FFFFFF',
      '--md-surface-container-low': '#FDF1E8',
      '--md-surface-container': '#F7EBE2',
      '--md-surface-container-high': '#F1E5DC',
      '--md-surface-container-highest': '#EBDFD6',
      '--md-on-surface': '#211A14',
      '--md-on-surface-variant': '#50453B',
      '--md-outline': '#827569',
      '--md-outline-variant': '#D4C4B6',
    },
    dark: {
      '--md-primary': '#FFB870',
      '--md-on-primary': '#4A2800',
      '--md-primary-container': '#5C3504',
      '--md-on-primary-container': '#FFDCBE',
      '--md-secondary': '#E2C1A4',
      '--md-on-secondary': '#402C18',
      '--md-secondary-container': '#4A3624',
      '--md-on-secondary-container': '#FFDCBE',
      '--md-tertiary': '#C1CD99',
      '--md-on-tertiary': '#2B3410',
      '--md-tertiary-container': '#38411F',
      '--md-on-tertiary-container': '#DDE9B3',
      '--md-surface': '#14100C',
      '--md-surface-container-lowest': '#0F0B08',
      '--md-surface-container-low': '#1C1611',
      '--md-surface-container': '#221B16',
      '--md-surface-container-high': '#2B231D',
      '--md-surface-container-highest': '#352C25',
      '--md-on-surface': '#F0E5DC',
      '--md-on-surface-variant': '#C4B4A7',
      '--md-outline': '#8A7B6F',
      '--md-outline-variant': '#352C24',
    },
  },
  emerald: {
    name: 'Emerald',
    swatch: '#1B6D37',
    light: {
      '--md-primary': '#1B6D37',
      '--md-on-primary': '#FFFFFF',
      '--md-primary-container': '#A3F5B1',
      '--md-on-primary-container': '#00210B',
      '--md-secondary': '#506352',
      '--md-on-secondary': '#FFFFFF',
      '--md-secondary-container': '#D3E8D3',
      '--md-on-secondary-container': '#0E1F12',
      '--md-tertiary': '#3A656F',
      '--md-on-tertiary': '#FFFFFF',
      '--md-tertiary-container': '#BDEAF5',
      '--md-on-tertiary-container': '#001F26',
      '--md-surface': '#F6FBF3',
      '--md-surface-container-lowest': '#FFFFFF',
      '--md-surface-container-low': '#F0F5ED',
      '--md-surface-container': '#EAEFE8',
      '--md-surface-container-high': '#E4EAE2',
      '--md-surface-container-highest': '#DFE4DC',
      '--md-on-surface': '#181D18',
      '--md-on-surface-variant': '#414941',
      '--md-outline': '#717971',
      '--md-outline-variant': '#C1C9BF',
    },
    dark: {
      '--md-primary': '#88D897',
      '--md-on-primary': '#003917',
      '--md-primary-container': '#0C4722',
      '--md-on-primary-container': '#A3F5B1',
      '--md-secondary': '#B7CCB7',
      '--md-on-secondary': '#233426',
      '--md-secondary-container': '#2E3D30',
      '--md-on-secondary-container': '#D3E8D3',
      '--md-tertiary': '#A2CED9',
      '--md-on-tertiary': '#01363F',
      '--md-tertiary-container': '#1C4149',
      '--md-on-tertiary-container': '#BDEAF5',
      '--md-surface': '#0E130F',
      '--md-surface-container-lowest': '#090D0A',
      '--md-surface-container-low': '#151B16',
      '--md-surface-container': '#1B211C',
      '--md-surface-container-high': '#232A24',
      '--md-surface-container-highest': '#2D352E',
      '--md-on-surface': '#E3EAE2',
      '--md-on-surface-variant': '#B2BDB2',
      '--md-outline': '#7A8479',
      '--md-outline-variant': '#273028',
    },
  },
};

const LANG_COLORS: Record<string, string> = {
  Kotlin: '#A97BFF',
  Java: '#B07219',
  C: '#555555',
  'C++': '#F34B7D',
  Makefile: '#427819',
  Shell: '#89E051',
  Python: '#3572A5',
  QML: '#44A51C',
  GLSL: '#5686A5',
  PureBasic: '#5A6986',
};

const PROJECTS: Project[] = [
  {
    id: 'fogosparts',
    title: 'android_packages_apps_FogosParts',
    org: 'fogos-5-4',
    badge: 'App',
    category: 'Audio & Apps',
    language: 'Kotlin',
    description:
      'Device-specific control room and settings overlay for Motorola fogos custom ROM builds.',
    url: 'https://github.com/fogos-5-4/android_packages_apps_FogosParts',
    highlights: [
      'Maintained under the fogos-5-4 organization',
      'Custom device-specific toggles & preferences in Kotlin',
      'Built natively alongside AOSP system packages',
    ],
  },
  {
    id: 'dolby-lunaris',
    title: 'hardware_dolby_lunaris',
    org: 'fogos-5-4',
    badge: 'Dolby',
    category: 'Audio & Apps',
    language: 'Kotlin',
    description:
      'Dolby Lunaris audio processing and Spatial/EQ control interface for AOSP builds.',
    url: 'https://github.com/fogos-5-4/hardware_dolby_lunaris',
    highlights: [
      'Dolby Lunaris audio tuning package',
      'Kotlin-based control UI & service hooks',
      'Integrated into fogos-5-4 ROM releases',
    ],
  },
  {
    id: 'dolby-motorola',
    title: 'hardware_dolby_motorola',
    org: 'fogos-5-4',
    badge: 'Dolby',
    category: 'Audio & Apps',
    language: 'Makefile',
    description: 'Motorola stock Dolby port adapted cleanly for AOSP ROMs.',
    url: 'https://github.com/fogos-5-4/hardware_dolby_motorola',
    highlights: [
      'Motorola stock Dolby Atmos port for AOSP',
      'Clean Makefile & audio effect policy integration',
      'Preserves stock acoustic profiles on custom builds',
    ],
  },
  {
    id: 'viper4android',
    title: 'packages_apps_ViPER4AndroidFX',
    org: 'fogos-5-4',
    badge: 'Audio',
    category: 'Audio & Apps',
    language: 'Makefile',
    description: 'ViPER4AndroidFX (v4a re) audio DSP integration for fogos builds.',
    url: 'https://github.com/fogos-5-4/packages_apps_ViPER4AndroidFX',
    highlights: [
      'v4a re prebuilt & build-tree integration',
      'System-level audio DSP support',
      'Packaged cleanly via AOSP Makefiles',
    ],
  },
  {
    id: 'device-as-webcam',
    title: 'packages_services_DeviceAsWebcam',
    org: 'fogos-5-4',
    badge: 'Service',
    category: 'Audio & Apps',
    language: 'Java',
    description:
      'AOSP DeviceAsWebcam service enabling USB UVC webcam functionality on Motorola fogos.',
    url: 'https://github.com/fogos-5-4/packages_services_DeviceAsWebcam',
    highlights: [
      'Turns Moto G34 / G45 5G into a plug-and-play USB webcam',
      'AOSP UVC gadget service adaptation',
      'Written in Java for Android framework compatibility',
    ],
  },
  {
    id: 'fogos-tree',
    title: 'android_device_motorola_fogos',
    org: 'fogos-5-4',
    badge: 'Device Tree',
    category: 'Device & Vendor',
    language: 'Makefile',
    description:
      'Primary device tree blueprint that gets the Moto G34 / G45 5G booting custom Android.',
    url: 'https://github.com/fogos-5-4/android_device_motorola_fogos',
    highlights: [
      'Board configs, overlays & init scripts for Motorola fogos',
      'Supports Motorola Moto G34 5G & Moto G45 5G',
      'Now maintained in the fogos-5-4 organization',
    ],
  },
  {
    id: 'sm6375-common',
    title: 'android_device_motorola_sm6375-common',
    org: 'fogos-5-4',
    badge: 'Device Tree',
    category: 'Device & Vendor',
    language: 'C++',
    description:
      'Shared Snapdragon 695 (sm6375) common device tree powering fogos builds.',
    url: 'https://github.com/fogos-5-4/android_device_motorola_sm6375-common',
    highlights: [
      'Common platform definitions for Qualcomm SM6375',
      'Shared display, audio, media & RIL configurations',
      'Keeps device-specific trees lean and modular',
    ],
  },
  {
    id: 'vendor-fogos',
    title: 'proprietary_vendor_motorola_fogos',
    org: 'fogos-5-4',
    badge: 'Vendor',
    category: 'Device & Vendor',
    language: 'Makefile',
    description:
      'Device-specific proprietary vendor blobs required for Moto G34 / G45 5G bring-up.',
    url: 'https://github.com/fogos-5-4/proprietary_vendor_motorola_fogos',
    highlights: [
      'Extracted proprietary firmware & shared libraries',
      'Android.bp & Makefile rules for clean AOSP linking',
      'Companion to android_device_motorola_fogos',
    ],
  },
  {
    id: 'vendor-sm6375-common',
    title: 'proprietary_vendor_motorola_sm6375-common',
    org: 'fogos-5-4',
    badge: 'Vendor',
    category: 'Device & Vendor',
    language: 'Makefile',
    description:
      'Shared proprietary vendor blobs for the Motorola Qualcomm SM6375 platform.',
    url: 'https://github.com/fogos-5-4/proprietary_vendor_motorola_sm6375-common',
    highlights: [
      'Common Snapdragon 695 vendor libraries & HAL blobs',
      'Paired with android_device_motorola_sm6375-common',
      'Structured for reproducible ROM builds',
    ],
  },
  {
    id: 'motocam',
    title: 'vendor_motorola_motocam',
    org: 'fogos-5-4',
    badge: 'Camera',
    category: 'Device & Vendor',
    language: 'Shell',
    description:
      'Motorola stock camera (MotoCam) vendor package for custom AOSP ROMs.',
    url: 'https://github.com/fogos-5-4/vendor_motorola_motocam',
    highlights: [
      'Brings stock Motorola camera experience to AOSP',
      'Shell-scripted extraction & vendor packaging',
      'Maintained under fogos-5-4',
    ],
  },
  {
    id: 'fogos-dump',
    title: 'motorola_fogos_dump',
    org: 'fogos-5-4',
    badge: 'Dump',
    category: 'Device & Vendor',
    language: 'PureBasic',
    description:
      'Stock firmware reference dump: user 15 V1UGS35H.75-14-9-3-1-4 d59ef release-keys.',
    url: 'https://github.com/fogos-5-4/motorola_fogos_dump',
    highlights: [
      'Android 15 stock release-keys reference dump',
      'Build ID: V1UGS35H.75-14-9-3-1-4 (d59ef)',
      'Reference source for blobs, props, and sepolicy',
    ],
  },
  {
    id: 'motorola-hardware',
    title: 'android_hardware_motorola',
    org: 'fogos-5-4',
    badge: 'Hardware',
    category: 'Kernel & System',
    language: 'Kotlin',
    description:
      'Motorola HALs and hardware interfaces bridging vendor services with AOSP.',
    url: 'https://github.com/fogos-5-4/android_hardware_motorola',
    highlights: [
      'Updated hardware abstraction interfaces',
      'Supports charging, gestures, and device-specific HALs',
      'Hosted in fogos-5-4',
    ],
  },
  {
    id: 'samsung-nfc',
    title: 'android_hardware_samsung_slsi_nfc',
    org: 'fogos-5-4',
    badge: 'NFC HAL',
    category: 'Kernel & System',
    language: 'C++',
    description:
      'Samsung SLSI NFC hardware abstraction layer for AOSP device bring-up.',
    url: 'https://github.com/fogos-5-4/android_hardware_samsung_slsi_nfc',
    highlights: [
      'C++ NFC HAL implementation for SLSI chipsets',
      'Maintained for fogos-5-4 hardware compatibility',
      'Clean AOSP HIDL/AIDL integration',
    ],
  },
  {
    id: 'system-sepolicy',
    title: 'system_sepolicy',
    org: 'fogos-5-4',
    badge: 'SELinux',
    category: 'Kernel & System',
    language: 'Python',
    description:
      'AOSP SELinux policy definitions and build tooling for fogos ROMs.',
    url: 'https://github.com/fogos-5-4/system_sepolicy',
    highlights: [
      'Enforcing SELinux rules & compatibility mappings',
      'Python policy verification & build scripts',
      'Keeps custom builds secure and compliant',
    ],
  },
  {
    id: 'motorola-kernel',
    title: 'android_kernel_motorola_sm6375',
    org: 'fogos-5-4',
    badge: 'Kernel',
    category: 'Kernel & System',
    language: 'C',
    description:
      'Linux 5.4 kernel source for Motorola sm6375 devices, ready to poke, patch, and rebuild.',
    url: 'https://github.com/fogos-5-4/android_kernel_motorola_sm6375',
    highlights: [
      'Linux 5.4 kernel tree for Moto G34 / G45 5G',
      'Tuned and patched for custom ROM stability',
      'Maintained under fogos-5-4',
    ],
  },
  {
    id: 'susfs',
    title: 'susfs_5.4',
    org: 'fogos-5-4',
    badge: 'Kernel',
    category: 'Kernel & System',
    language: 'C',
    description:
      'Kernel-level hide-and-seek (SUSFS 5.4) for root and system modifications.',
    url: 'https://github.com/fogos-5-4/susfs_5.4',
    highlights: [
      'Kernel 5.4 filesystem-level hiding patches',
      'Masks root & mount traces from userspace checks',
      'Pure C kernel-space integration',
    ],
  },
  {
    id: 'messaging',
    title: 'android_packages_apps_Messaging',
    org: 'tiraq-official',
    badge: 'App',
    category: 'Audio & Apps',
    language: 'Java',
    description:
      'The AOSP messaging app, kept alive and shipping cleanly with custom builds.',
    url: 'https://github.com/tiraq-official/android_packages_apps_Messaging',
    highlights: [
      'Maintained AOSP SMS/MMS client',
      'Updated to compile cleanly on modern Android trees',
      'Lightweight, telemetry-free stock experience',
    ],
  },
  {
    id: 'guardian',
    title: 'Guardian',
    org: 'tiraq-official',
    badge: 'Mod',
    category: 'Kernel & System',
    language: 'Shell',
    description:
      'Half a million domains in one hosts file — ads, gambling and adult sites blocked system-wide.',
    url: 'https://github.com/tiraq-official/Guardian',
    highlights: [
      '500,000+ curated domain entries in a single hosts file',
      'System-wide ad, gambling, and adult domain blocking',
      'Automated shell packaging for rooted setups',
    ],
  },
  {
    id: 'animeunlock',
    title: 'AnimeUnlock',
    org: 'tiraq-official',
    badge: 'Linux',
    category: 'Linux & Ricing',
    language: 'QML',
    description:
      'A frosted-glass SDDM login screen — profile on the left, session on the right, and a password bar that rises out of the blur.',
    url: 'https://github.com/tiraq-official/AnimeUnlock',
    highlights: [
      'Custom QML SDDM theme with frosted-glass blur',
      'Asymmetric profile & session layout',
      'Animated password input transition on focus',
    ],
  },
  {
    id: 'catppuccin-i3',
    title: 'catppuccin-mocha-i3',
    org: 'tiraq-official',
    badge: 'Linux',
    category: 'Linux & Ricing',
    language: 'GLSL',
    description:
      'My first i3 rice on Arch Linux, dressed head-to-toe in Catppuccin Mocha.',
    url: 'https://github.com/tiraq-official/catppuccin-mocha-i3',
    highlights: [
      'Complete Arch Linux + i3wm desktop configuration',
      'Cohesive Catppuccin Mocha color scheme',
      'Custom GLSL compositor shaders & bar styling',
    ],
  },
];

const INTERESTS: Interest[] = [
  {
    id: 'tinkering',
    title: 'System tinkering',
    tag: 'Primary',
    description:
      'Android ROMs, kernel patching, and a Linux setup I rearrange far too often.',
    icon: <Terminal className="w-5 h-5" />,
    tone: 'primary',
    span: 'md:col-span-7',
  },
  {
    id: 'motorsport',
    title: 'Motorsport',
    tag: 'Weekends',
    description:
      'Formula 1 and rally racing. Race weekends are non-negotiable.',
    icon: <Flag className="w-5 h-5" />,
    tone: 'tertiary',
    span: 'md:col-span-5',
  },
  {
    id: 'curiosity',
    title: 'Curiosity',
    tag: 'Security',
    description:
      'Cybersecurity, open source, and poking at how things actually work.',
    icon: <Shield className="w-5 h-5" />,
    tone: 'surface',
    span: 'md:col-span-4',
  },
  {
    id: 'gaming',
    title: 'Gaming',
    tag: 'RPGs',
    description: 'Action RPGs and tactical games – the longer the better.',
    icon: <Gamepad2 className="w-5 h-5" />,
    tone: 'secondary',
    span: 'md:col-span-4',
  },
  {
    id: 'music',
    title: 'Music',
    tag: 'Audio',
    description:
      'Acoustic sets, softer sounds, and a headphone collection I justify badly.',
    icon: <Headphones className="w-5 h-5" />,
    tone: 'surface',
    span: 'md:col-span-4',
  },
  {
    id: 'opensource',
    title: 'Open source',
    tag: 'Community',
    description:
      'Giving builds, trees, Dolby ports, and tooling back to whoever wants them — now organized under fogos-5-4.',
    icon: <HeartHandshake className="w-5 h-5" />,
    tone: 'primary',
    span: 'md:col-span-12',
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages & Shell',
    tagline: '11 languages',
    subtitle: 'From Kotlin Android overlays to C kernel patches & Makefiles',
    items: [
      { name: 'C', note: 'Linux 5.4 kernel & SUSFS patches' },
      { name: 'C++', note: 'SM6375 common HALs & NFC' },
      { name: 'Kotlin', note: 'FogosParts & Dolby Lunaris' },
      { name: 'Java', note: 'AOSP Messaging & DeviceAsWebcam' },
      { name: 'Python', note: 'SEPolicy & automation scripts' },
      { name: 'Makefile', note: 'AOSP & vendor build rules' },
      { name: 'Bash / Shell', note: 'Guardian & MotoCam packaging' },
      { name: 'QML', note: 'AnimeUnlock SDDM greeter' },
      { name: 'GLSL', note: 'Arch i3 compositor shaders' },
      { name: 'AIDL', note: 'Modern Android hardware glue' },
    ],
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: 'android',
    label: 'Android & Bring-up',
    tagline: 'Core stack',
    subtitle: 'End-to-end Moto G34 / G45 5G (fogos) AOSP maintenance',
    items: [
      { name: 'AOSP', note: 'Full source tree bring-up & builds' },
      { name: 'Device Trees', note: 'fogos & sm6375-common' },
      { name: 'Linux Kernel 5.4', note: 'sm6375 & SUSFS integration' },
      { name: 'Dolby & V4A', note: 'Stock Dolby & ViPER4AndroidFX' },
      { name: 'SEPolicy', note: 'Enforcing system policies' },
      { name: 'Magisk & Termux', note: 'Root modules & on-device shell' },
    ],
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: 'systems',
    label: 'Linux & Desktop',
    tagline: 'Daily driver',
    subtitle: 'Minimal, keyboard-driven Arch Linux environments',
    items: [
      { name: 'Arch Linux', note: 'Daily driver OS & tinkering lab' },
      { name: 'Hyprland', note: 'Wayland tiling compositor setup' },
      { name: 'i3wm', note: 'Catppuccin Mocha desktop rice' },
      { name: 'SDDM', note: 'Custom QML frosted-glass themes' },
    ],
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 'vcs',
    label: 'Version Control',
    tagline: 'Workflow',
    subtitle: 'Clean commit histories, rebases, and org maintenance',
    items: [
      { name: 'Git', note: 'Kernel rebases, cherry-picks & bisect' },
      { name: 'GitHub', note: 'tiraq-official & fogos-5-4 org' },
    ],
    icon: <GitBranch className="w-5 h-5" />,
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github-org',
    name: 'fogos-5-4 Org',
    handle: 'github.com/fogos-5-4',
    description: 'All Moto G34 / G45 5G trees, kernel & audio ports',
    url: 'https://github.com/fogos-5-4',
    icon: <FolderGit2 className="w-5 h-5" />,
    tone: 'primary',
  },
  {
    id: 'github',
    name: 'GitHub Profile',
    handle: '@tiraq-official',
    description: 'All the code, all the chaos',
    url: 'https://github.com/tiraq-official',
    icon: <Github className="w-5 h-5" />,
    tone: 'secondary',
  },
  {
    id: 'tg-group',
    name: 'Telegram Group',
    handle: 't.me/TheEuthymia',
    description: 'Community & chatter',
    url: 'https://t.me/TheEuthymia',
    icon: <Send className="w-5 h-5" />,
    tone: 'tertiary',
  },
  {
    id: 'tg-dm',
    name: 'Telegram DMs',
    handle: 't.me/lost_traveller',
    description: 'Straight to my DMs',
    url: 'https://t.me/lost_traveller',
    icon: <Send className="w-5 h-5" />,
    tone: 'surface',
  },
  {
    id: 'anilist',
    name: 'AniList',
    handle: 'anilist.co/user/tiraq',
    description: 'Manhwa, manga & anime I’m tracking',
    url: 'https://anilist.co/user/tiraq/',
    icon: <Tv className="w-5 h-5" />,
    tone: 'surface',
  },
];

const CATEGORIES: FilterCategory[] = [
  'All',
  'fogos-5-4',
  'Device & Vendor',
  'Audio & Apps',
  'Kernel & System',
  'Linux & Ricing',
];

const STATS = [
  {
    value: '17',
    label: 'fogos-5-4 repos',
    sub: 'Dedicated Moto G34 / G45 5G org',
  },
  {
    value: '1',
    label: 'phone kept alive',
    sub: 'Motorola fogos (sm6375)',
  },
  {
    value: '10+',
    label: 'languages juggled',
    sub: 'C, C++, Kotlin, Python, QML & more',
  },
  {
    value: '100%',
    label: 'open source, always',
    sub: 'Built for the community',
  },
];

function RevealOnScroll({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
      }}
      className={`transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-5 scale-[0.985]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [seedTheme, setSeedTheme] = useState<SeedTheme>('violet');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState<string>('languages');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [paletteMenuOpen, setPaletteMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedDark = localStorage.getItem('tiraq_md3_dark');
      const savedSeed = localStorage.getItem('tiraq_md3_seed') as SeedTheme | null;
      if (savedDark !== null) setIsDark(savedDark === 'true');
      if (savedSeed && MD3_PALETTES[savedSeed]) setSeedTheme(savedSeed);
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tiraq_md3_dark', String(isDark));
      localStorage.setItem('tiraq_md3_seed', seedTheme);
    } catch {
      // Ignore storage restrictions
    }
  }, [isDark, seedTheme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const sections = ['overview', 'about', 'toolbox', 'works', 'connect'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setPaletteMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const themeVars = useMemo(() => {
    const palette = MD3_PALETTES[seedTheme];
    return (isDark ? palette.dark : palette.light) as React.CSSProperties;
  }, [seedTheme, isDark]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesCat =
        activeCategory === 'All' ||
        (activeCategory === 'fogos-5-4'
          ? p.org === 'fogos-5-4'
          : p.category === activeCategory);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.language.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.org.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const activeSkillGroup = useMemo(
    () => SKILL_GROUPS.find((g) => g.id === activeSkillTab) || SKILL_GROUPS[0],
    [activeSkillTab]
  );

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'works', label: 'Works' },
    { id: 'connect', label: 'Connect' },
  ];

  return (
    <div
      style={{
        ...themeVars,
        backgroundColor: 'var(--md-surface)',
        color: 'var(--md-on-surface)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
      className="min-h-screen transition-colors duration-500 selection:bg-[var(--md-primary-container)] selection:text-[var(--md-on-primary-container)] pb-24 md:pb-14"
    >
      <style>{`
        @keyframes md3FadeSlide {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .md3-card-anim {
          animation: md3FadeSlide 0.36s cubic-bezier(0.2, 0.0, 0, 1.0) both;
        }
        .md3-state-layer {
          position: relative;
          overflow: hidden;
        }
        .md3-state-layer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity 200ms cubic-bezier(0.2, 0.0, 0, 1.0);
          pointer-events: none;
        }
        .md3-state-layer:hover::after {
          opacity: 0.07;
        }
        .md3-state-layer:active::after {
          opacity: 0.12;
        }
      `}</style>

      {/* MD3 Top App Bar */}
      <header
        style={{
          backgroundColor: scrolled
            ? 'var(--md-surface-container)'
            : 'var(--md-surface)',
          borderColor: scrolled
            ? 'var(--md-outline-variant)'
            : 'transparent',
        }}
        className={`sticky top-0 z-40 border-b rounded-b-[24px] transition-all duration-300 backdrop-blur-md ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('overview')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div
              style={{
                backgroundColor: 'var(--md-primary)',
                color: 'var(--md-on-primary)',
              }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base tracking-tight transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
            >
              T
            </div>
            <div>
              <div className="font-semibold text-base leading-tight tracking-tight">
                Tiraq
              </div>
              <div
                style={{ color: 'var(--md-on-surface-variant)' }}
                className="text-xs leading-tight"
              >
                fogos-5-4 maintainer
              </div>
            </div>
          </button>

          <nav
            aria-label="Primary navigation"
            style={{
              backgroundColor: 'var(--md-surface-container-low)',
              borderColor: 'var(--md-outline-variant)',
            }}
            className="hidden md:flex items-center gap-1 p-1 rounded-full border"
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    backgroundColor: active
                      ? 'var(--md-secondary-container)'
                      : 'transparent',
                    color: active
                      ? 'var(--md-on-secondary-container)'
                      : 'var(--md-on-surface-variant)',
                  }}
                  className="md3-state-layer px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <button
                type="button"
                aria-label="Change Material 3 dynamic color theme"
                onClick={() => setPaletteMenuOpen((v) => !v)}
                style={{
                  backgroundColor: 'var(--md-surface-container-high)',
                  color: 'var(--md-on-surface)',
                }}
                className="md3-state-layer h-10 px-3.5 rounded-full flex items-center gap-2 text-sm font-medium transition-transform active:scale-95"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">
                  {MD3_PALETTES[seedTheme].name}
                </span>
              </button>

              {paletteMenuOpen && (
                <div
                  style={{
                    backgroundColor: 'var(--md-surface-container-high)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="md3-card-anim absolute right-0 mt-2 w-48 rounded-2xl border shadow-lg p-2 z-50"
                >
                  <div
                    style={{ color: 'var(--md-on-surface-variant)' }}
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
                  >
                    MD3 Dynamic Seed
                  </div>
                  {(Object.keys(MD3_PALETTES) as SeedTheme[]).map((key) => {
                    const p = MD3_PALETTES[key];
                    const selected = seedTheme === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSeedTheme(key);
                          setPaletteMenuOpen(false);
                        }}
                        style={{
                          backgroundColor: selected
                            ? 'var(--md-secondary-container)'
                            : 'transparent',
                          color: selected
                            ? 'var(--md-on-secondary-container)'
                            : 'var(--md-on-surface)',
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-black/5"
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            style={{ backgroundColor: p.swatch }}
                            className="w-3.5 h-3.5 rounded-full inline-block"
                          />
                          {p.name}
                        </span>
                        {selected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={() => setIsDark((d) => !d)}
              style={{
                backgroundColor: 'var(--md-surface-container-high)',
                color: 'var(--md-on-surface)',
              }}
              className="md3-state-layer w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((m) => !m)}
              style={{
                backgroundColor: mobileMenuOpen
                  ? 'var(--md-primary-container)'
                  : 'var(--md-surface-container-high)',
                color: mobileMenuOpen
                  ? 'var(--md-on-primary-container)'
                  : 'var(--md-on-surface)',
              }}
              className="md:hidden md3-state-layer w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[4.5px] transition-colors duration-300 active:scale-95"
            >
              <span
                style={{ backgroundColor: 'currentColor', transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0, 1.0)' }}
                className={`block h-[2px] w-4 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                }`}
              />
              <span
                style={{ backgroundColor: 'currentColor', transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0, 1.0)' }}
                className={`block h-[2px] w-4 rounded-full transition-all duration-200 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                style={{ backgroundColor: 'currentColor', transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0, 1.0)' }}
                className={`block h-[2px] w-4 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modern Animated MD3 Navigation Sheet */}
        <div
          style={{
            transitionTimingFunction: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
          }}
          className={`md:hidden grid transition-all duration-300 ${
            mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div
              style={{
                backgroundColor: 'var(--md-surface-container-low)',
                borderColor: 'var(--md-outline-variant)',
              }}
              className="mx-4 mb-3 mt-1 rounded-[24px] border p-2.5 shadow-lg space-y-1"
            >
              {navItems.map((item, idx) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      backgroundColor: active
                        ? 'var(--md-secondary-container)'
                        : 'transparent',
                      color: active
                        ? 'var(--md-on-secondary-container)'
                        : 'var(--md-on-surface)',
                      transitionDelay: mobileMenuOpen ? `${idx * 35}ms` : '0ms',
                    }}
                    className={`md3-state-layer w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24 pt-8 sm:pt-12">
        {/* HERO SECTION — Expressive MD3 Editorial Layout */}
        <section id="overview" className="scroll-mt-24 space-y-6">
          <div
            style={{
              backgroundColor: 'var(--md-surface-container-low)',
              borderColor: 'var(--md-outline-variant)',
            }}
            className="relative overflow-hidden rounded-[32px] border p-7 sm:p-12"
          >
            {/* Subtle MD3 Tonal Radial Accents */}
            <div
              style={{ backgroundColor: 'var(--md-primary-container)' }}
              className={`pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl transition-opacity duration-500 ${
                isDark ? 'opacity-15' : 'opacity-40'
              }`}
            />
            <div
              style={{ backgroundColor: 'var(--md-tertiary-container)' }}
              className={`pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl transition-opacity duration-500 ${
                isDark ? 'opacity-10' : 'opacity-30'
              }`}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    style={{
                      backgroundColor: 'var(--md-primary-container)',
                      color: 'var(--md-on-primary-container)',
                    }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    fogos maintainer · Moto G34 / G45 5G
                  </span>
                  <span
                    style={{
                      backgroundColor: 'var(--md-tertiary-container)',
                      color: 'var(--md-on-tertiary-container)',
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Android ROMs, built loud
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]">
                  I tinker with Android until it feels{' '}
                  <span style={{ color: 'var(--md-primary)' }}>brand new.</span>
                </h1>

                <p
                  style={{ color: 'var(--md-on-surface-variant)' }}
                  className="text-base sm:text-xl leading-relaxed max-w-2xl"
                >
                  ROMs, kernels, device trees and the odd 3 a.m. build. I&apos;m{' '}
                  <strong style={{ color: 'var(--md-on-surface)' }}>Tiraq</strong>{' '}
                  – I make phones do things their makers never planned.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => scrollToSection('works')}
                    style={{
                      backgroundColor: 'var(--md-primary)',
                      color: 'var(--md-on-primary)',
                    }}
                    className="md3-state-layer inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold shadow-sm transition-transform active:scale-95"
                  >
                    Explore Selected Works
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://github.com/fogos-5-4"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: 'var(--md-secondary-container)',
                      color: 'var(--md-on-secondary-container)',
                    }}
                    className="md3-state-layer inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold transition-transform active:scale-95"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    fogos-5-4 Org
                  </a>

                  <a
                    href="https://github.com/tiraq-official"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      borderColor: 'var(--md-outline)',
                      color: 'var(--md-primary)',
                    }}
                    className="md3-state-layer inline-flex items-center gap-2 px-5 py-3.5 rounded-full border text-sm font-semibold transition-transform active:scale-95"
                  >
                    <Github className="w-4 h-4" />
                    @tiraq-official
                  </a>
                </div>
              </div>

              {/* Right Column: Clean MD3 Organization & Philosophy Cards */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <a
                  href="https://github.com/fogos-5-4"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: 'var(--md-surface-container-lowest)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="md3-state-layer group rounded-[24px] border p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        backgroundColor: 'var(--md-primary-container)',
                        color: 'var(--md-on-primary-container)',
                      }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    >
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <ArrowUpRight
                      style={{ color: 'var(--md-on-surface-variant)' }}
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                      Device Organization
                    </div>
                    <div className="text-lg font-bold mt-0.5">fogos-5-4</div>
                    <p
                      style={{ color: 'var(--md-on-surface-variant)' }}
                      className="text-xs leading-relaxed mt-1"
                    >
                      Home to all Moto G34 / G45 5G trees, Linux 5.4 kernel,
                      Dolby ports, ViPER4AndroidFX &amp; vendor blobs.
                    </p>
                  </div>
                </a>

                <div
                  style={{
                    backgroundColor: 'var(--md-primary-container)',
                    color: 'var(--md-on-primary-container)',
                  }}
                  className="rounded-[24px] p-5 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider opacity-75">
                      Philosophy
                    </div>
                    <div className="text-base font-bold leading-snug mt-0.5">
                      &ldquo;Build it. Break it. Then figure out why.&rdquo;
                    </div>
                  </div>
                  <Cpu className="w-6 h-6 shrink-0 opacity-85" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stats Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <RevealOnScroll key={stat.label} delay={idx * 60}>
                <div
                  style={{
                    backgroundColor: 'var(--md-surface-container)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="rounded-[24px] border p-5 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div
                    style={{ color: 'var(--md-primary)' }}
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2.5">
                    <div className="text-sm font-semibold">{stat.label}</div>
                    <div
                      style={{ color: 'var(--md-on-surface-variant)' }}
                      className="text-xs mt-0.5"
                    >
                      {stat.sub}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ABOUT & THINGS I'M INTO — Asymmetric MD3 Bento */}
        <section id="about" className="scroll-mt-24 space-y-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div
                style={{
                  backgroundColor: 'var(--md-surface-container-low)',
                  borderColor: 'var(--md-outline-variant)',
                }}
                className="lg:col-span-5 rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <span
                    style={{
                      backgroundColor: 'var(--md-secondary-container)',
                      color: 'var(--md-on-secondary-container)',
                    }}
                    className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold"
                  >
                    About
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Right, hello.
                  </h2>
                  <p className="text-base font-semibold">
                    I&apos;m Tiraq – Saptak Maji on the official paperwork.
                  </p>
                  <p
                    style={{ color: 'var(--md-on-surface-variant)' }}
                    className="text-sm sm:text-base leading-relaxed"
                  >
                    Student, tinkerer, and full-time resident of the Android
                    rabbit hole. Most days I&apos;m deep in the AOSP world –
                    writing device trees, patching kernels, and figuring out why
                    a build that worked yesterday now refuses to boot. It&apos;s
                    a hobby and a mild obsession.
                  </p>
                  <p
                    style={{ color: 'var(--md-on-surface-variant)' }}
                    className="text-sm sm:text-base leading-relaxed"
                  >
                    Away from the terminal it&apos;s F1 race weekends, action
                    RPGs, and playlists that swing wildly between very loud and
                    very quiet. No in-between.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--md-surface-container-high)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="rounded-2xl border px-4 py-3 flex items-center justify-between text-xs"
                >
                  <span style={{ color: 'var(--md-on-surface-variant)' }}>
                    Primary Target
                  </span>
                  <span className="font-mono font-semibold">
                    motorola / fogos (sm6375)
                  </span>
                </div>
              </div>

              {/* Asymmetric MD3 Bento for Things I'm into */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xl font-bold tracking-tight">
                    Things I&apos;m into
                  </h3>
                  <span
                    style={{ color: 'var(--md-on-surface-variant)' }}
                    className="text-xs font-medium"
                  >
                    Off &amp; on the terminal
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
                  {INTERESTS.map((item, idx) => {
                    const bg =
                      item.tone === 'primary'
                        ? 'var(--md-primary-container)'
                        : item.tone === 'secondary'
                        ? 'var(--md-secondary-container)'
                        : item.tone === 'tertiary'
                        ? 'var(--md-tertiary-container)'
                        : 'var(--md-surface-container)';
                    const fg =
                      item.tone === 'primary'
                        ? 'var(--md-on-primary-container)'
                        : item.tone === 'secondary'
                        ? 'var(--md-on-secondary-container)'
                        : item.tone === 'tertiary'
                        ? 'var(--md-on-tertiary-container)'
                        : 'var(--md-on-surface)';

                    return (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: bg,
                          color: fg,
                          borderColor:
                            item.tone === 'surface'
                              ? 'var(--md-outline-variant)'
                              : 'transparent',
                          animationDelay: `${idx * 50}ms`,
                        }}
                        className={`${item.span} group relative overflow-hidden rounded-[24px] border p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-0.5`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div
                            style={{
                              backgroundColor:
                                item.tone === 'surface'
                                  ? 'var(--md-surface-container-highest)'
                                  : isDark
                                  ? 'rgba(0,0,0,0.24)'
                                  : 'rgba(255,255,255,0.45)',
                            }}
                            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          >
                            {item.icon}
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider opacity-75">
                            {item.tag}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-85 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* TOOLBOX / SKILLS — Interactive MD3 Split Navigation Rail + Stage */}
        <section id="toolbox" className="scroll-mt-24 space-y-6">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span
                  style={{
                    backgroundColor: 'var(--md-tertiary-container)',
                    color: 'var(--md-on-tertiary-container)',
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold mb-2"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Skills &amp; Stack
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  My toolbox
                </h2>
              </div>
              <p
                style={{ color: 'var(--md-on-surface-variant)' }}
                className="text-sm"
              >
                Select a discipline to inspect the stack.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={60}>
            <div
              style={{
                backgroundColor: 'var(--md-surface-container-low)',
                borderColor: 'var(--md-outline-variant)',
              }}
              className="rounded-[28px] border p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left MD3 Navigation Rail / Selector List */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                {SKILL_GROUPS.map((group) => {
                  const active = activeSkillTab === group.id;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveSkillTab(group.id)}
                      style={{
                        backgroundColor: active
                          ? 'var(--md-secondary-container)'
                          : 'transparent',
                        color: active
                          ? 'var(--md-on-secondary-container)'
                          : 'var(--md-on-surface-variant)',
                      }}
                      className="md3-state-layer w-full text-left rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            backgroundColor: active
                              ? 'var(--md-primary)'
                              : 'var(--md-surface-container-highest)',
                            color: active
                              ? 'var(--md-on-primary)'
                              : 'var(--md-on-surface-variant)',
                          }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        >
                          {group.icon}
                        </div>
                        <div>
                          <div
                            style={{
                              color: active
                                ? 'var(--md-on-secondary-container)'
                                : 'var(--md-on-surface)',
                            }}
                            className="font-semibold text-sm"
                          >
                            {group.label}
                          </div>
                          <div className="text-xs opacity-75">
                            {group.tagline}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          active ? 'translate-x-0.5 opacity-100' : 'opacity-40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right MD3 Elevated Stage */}
              <div
                key={activeSkillGroup.id}
                style={{
                  backgroundColor: 'var(--md-surface-container-lowest)',
                  borderColor: 'var(--md-outline-variant)',
                }}
                className="md3-card-anim lg:col-span-8 rounded-[24px] border p-5 sm:p-6 flex flex-col justify-between gap-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--md-outline-variant)]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                      {activeSkillGroup.label}
                    </h3>
                    <p
                      style={{ color: 'var(--md-on-surface-variant)' }}
                      className="text-xs sm:text-sm mt-0.5"
                    >
                      {activeSkillGroup.subtitle}
                    </p>
                  </div>
                  <span
                    style={{
                      backgroundColor: 'var(--md-primary-container)',
                      color: 'var(--md-on-primary-container)',
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {activeSkillGroup.items.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSkillGroup.items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        backgroundColor: 'var(--md-surface-container)',
                        borderColor: 'var(--md-outline-variant)',
                      }}
                      className="rounded-2xl border px-4 py-3 flex flex-col justify-center gap-0.5 transition-colors hover:border-[var(--md-primary)]"
                    >
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="text-xs"
                      >
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* SELECTED WORKS SECTION */}
        <section id="works" className="scroll-mt-24 space-y-6">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span
                  style={{
                    backgroundColor: 'var(--md-primary-container)',
                    color: 'var(--md-on-primary-container)',
                  }}
                  className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-2"
                >
                  Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Selected works
                </h2>
                <p
                  style={{ color: 'var(--md-on-surface-variant)' }}
                  className="text-sm mt-1"
                >
                  Showing {filteredProjects.length} of {PROJECTS.length}{' '}
                  repositories across{' '}
                  <a
                    href="https://github.com/fogos-5-4"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--md-primary)' }}
                    className="font-semibold hover:underline"
                  >
                    fogos-5-4
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://github.com/tiraq-official"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--md-primary)' }}
                    className="font-semibold hover:underline"
                  >
                    tiraq-official
                  </a>
                  .
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div
                  style={{
                    backgroundColor: 'var(--md-surface-container-high)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="flex items-center gap-2 px-4 h-11 rounded-full border flex-1 md:w-64 focus-within:border-[var(--md-primary)] transition-colors"
                >
                  <Search
                    style={{ color: 'var(--md-on-surface-variant)' }}
                    className="w-4 h-4 shrink-0"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter repos, org, or tech..."
                    className="bg-transparent text-sm w-full focus:outline-none placeholder:text-[var(--md-on-surface-variant)]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 rounded-full hover:bg-black/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--md-surface-container-high)',
                    borderColor: 'var(--md-outline-variant)',
                  }}
                  className="flex items-center p-1 rounded-full border"
                >
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setViewMode('grid')}
                    style={{
                      backgroundColor:
                        viewMode === 'grid'
                          ? 'var(--md-secondary-container)'
                          : 'transparent',
                      color:
                        viewMode === 'grid'
                          ? 'var(--md-on-secondary-container)'
                          : 'var(--md-on-surface-variant)',
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setViewMode('list')}
                    style={{
                      backgroundColor:
                        viewMode === 'list'
                          ? 'var(--md-secondary-container)'
                          : 'transparent',
                      color:
                        viewMode === 'list'
                          ? 'var(--md-on-secondary-container)'
                          : 'var(--md-on-surface-variant)',
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      backgroundColor: active
                        ? 'var(--md-secondary-container)'
                        : 'var(--md-surface-container-low)',
                      color: active
                        ? 'var(--md-on-secondary-container)'
                        : 'var(--md-on-surface-variant)',
                      borderColor: active
                        ? 'transparent'
                        : 'var(--md-outline-variant)',
                    }}
                    className="md3-state-layer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95"
                  >
                    {active && <Check className="w-3.5 h-3.5" />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>

          {filteredProjects.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--md-surface-container-low)',
                borderColor: 'var(--md-outline-variant)',
              }}
              className="rounded-[28px] border p-10 text-center space-y-3"
            >
              <p className="font-semibold text-base">
                No repositories match &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                style={{
                  backgroundColor: 'var(--md-primary)',
                  color: 'var(--md-on-primary)',
                }}
                className="px-5 py-2 rounded-full text-sm font-medium"
              >
                Reset filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project, idx) => {
                const langColor = LANG_COLORS[project.language] || '#888888';
                return (
                  <article
                    key={project.id}
                    style={{
                      backgroundColor: 'var(--md-surface-container-low)',
                      borderColor: 'var(--md-outline-variant)',
                      animationDelay: `${idx * 30}ms`,
                    }}
                    onClick={() => setSelectedProject(project)}
                    className="md3-card-anim md3-state-layer group cursor-pointer rounded-[24px] border p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          style={{
                            backgroundColor:
                              project.org === 'fogos-5-4'
                                ? 'var(--md-primary-container)'
                                : 'var(--md-secondary-container)',
                            color:
                              project.org === 'fogos-5-4'
                                ? 'var(--md-on-primary-container)'
                                : 'var(--md-on-secondary-container)',
                          }}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold"
                        >
                          {project.org}
                        </span>
                        <span
                          style={{
                            backgroundColor: 'var(--md-surface-container-high)',
                            color: 'var(--md-on-surface-variant)',
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium"
                        >
                          <span
                            style={{ backgroundColor: langColor }}
                            className="w-2 h-2 rounded-full"
                          />
                          {project.language}
                        </span>
                      </div>

                      <div>
                        <div
                          style={{ color: 'var(--md-primary)' }}
                          className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                        >
                          {project.badge}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight break-words">
                          {project.title}
                        </h3>
                      </div>

                      <p
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="text-sm leading-relaxed"
                      >
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--md-outline-variant)]">
                      <span
                        style={{ color: 'var(--md-primary)' }}
                        className="text-xs font-semibold inline-flex items-center gap-1"
                      >
                        Inspect details
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                      >
                        GitHub
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredProjects.map((project, idx) => {
                const langColor = LANG_COLORS[project.language] || '#888888';
                return (
                  <article
                    key={project.id}
                    style={{
                      backgroundColor: 'var(--md-surface-container-low)',
                      borderColor: 'var(--md-outline-variant)',
                      animationDelay: `${idx * 25}ms`,
                    }}
                    onClick={() => setSelectedProject(project)}
                    className="md3-card-anim md3-state-layer cursor-pointer rounded-2xl border p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base break-all">
                          {project.title}
                        </h3>
                        <span
                          style={{
                            backgroundColor:
                              project.org === 'fogos-5-4'
                                ? 'var(--md-primary-container)'
                                : 'var(--md-secondary-container)',
                            color:
                              project.org === 'fogos-5-4'
                                ? 'var(--md-on-primary-container)'
                                : 'var(--md-on-secondary-container)',
                          }}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        >
                          {project.org}
                        </span>
                        <span
                          style={{
                            backgroundColor: 'var(--md-surface-container-high)',
                            color: 'var(--md-on-surface-variant)',
                          }}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[11px]"
                        >
                          <span
                            style={{ backgroundColor: langColor }}
                            className="w-2 h-2 rounded-full"
                          />
                          {project.language}
                        </span>
                      </div>
                      <p
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="text-sm"
                      >
                        {project.description}
                      </p>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        backgroundColor: 'var(--md-primary-container)',
                        color: 'var(--md-on-primary-container)',
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 self-start sm:self-center"
                    >
                      Open Repo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </article>
                );
              })}
            </div>
          )}

          {/* Dual Org & Repo Banner */}
          <div
            style={{
              backgroundColor: 'var(--md-primary-container)',
              color: 'var(--md-on-primary-container)',
            }}
            className="rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Everything else lives on GitHub
              </h3>
              <p className="text-sm opacity-90 mt-1">
                Moto G34 / G45 5G trees are maintained in{' '}
                <strong>fogos-5-4</strong>, alongside personal projects on{' '}
                <strong>tiraq-official</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="https://github.com/fogos-5-4"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: 'var(--md-primary)',
                  color: 'var(--md-on-primary)',
                }}
                className="md3-state-layer inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-transform active:scale-95"
              >
                <FolderGit2 className="w-4 h-4" />
                fogos-5-4
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/tiraq-official?tab=repositories"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: 'var(--md-surface-container-lowest)',
                  color: 'var(--md-on-surface)',
                }}
                className="md3-state-layer inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-transform active:scale-95"
              >
                <Github className="w-4 h-4" />
                tiraq-official
              </a>
            </div>
          </div>
        </section>

        {/* CONNECT & FOOTER SECTION */}
        <section id="connect" className="scroll-mt-24 space-y-6">
          <RevealOnScroll>
            <div className="space-y-2">
              <span
                style={{
                  backgroundColor: 'var(--md-secondary-container)',
                  color: 'var(--md-on-secondary-container)',
                }}
                className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold"
              >
                Connect
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Built in the terminal. Fuelled by curiosity.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SOCIAL_LINKS.map((link, idx) => {
              const iconBg =
                link.tone === 'primary'
                  ? 'var(--md-primary-container)'
                  : link.tone === 'secondary'
                  ? 'var(--md-secondary-container)'
                  : link.tone === 'tertiary'
                  ? 'var(--md-tertiary-container)'
                  : 'var(--md-surface-container-highest)';
              const iconFg =
                link.tone === 'primary'
                  ? 'var(--md-on-primary-container)'
                  : link.tone === 'secondary'
                  ? 'var(--md-on-secondary-container)'
                  : link.tone === 'tertiary'
                  ? 'var(--md-on-tertiary-container)'
                  : 'var(--md-on-surface)';

              return (
                <RevealOnScroll key={link.id} delay={idx * 50}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: 'var(--md-surface-container)',
                      borderColor: 'var(--md-outline-variant)',
                    }}
                    className="md3-state-layer rounded-[24px] border p-5 h-full flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        style={{ backgroundColor: iconBg, color: iconFg }}
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      >
                        {link.icon}
                      </div>
                      <ArrowUpRight
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-base">{link.name}</div>
                      <div
                        style={{ color: 'var(--md-primary)' }}
                        className="text-xs font-mono mt-0.5 break-all"
                      >
                        {link.handle}
                      </div>
                      <p
                        style={{ color: 'var(--md-on-surface-variant)' }}
                        className="text-xs mt-1.5 leading-relaxed"
                      >
                        {link.description}
                      </p>
                    </div>
                  </a>
                </RevealOnScroll>
              );
            })}
          </div>

          <footer
            style={{
              borderColor: 'var(--md-outline-variant)',
              color: 'var(--md-on-surface-variant)',
            }}
            className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          >
            <div>
              Tiraq (Saptak Maji) · Material Design 3 Portfolio
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/Orb_of_Fortune_Teller"
                target="_blank"
                rel="noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                Orb of Fortune Teller
              </a>
              <a
                href="https://github.com/fogos-5-4"
                target="_blank"
                rel="noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                fogos-5-4
              </a>
              <a
                href="https://github.com/tiraq-official/orb-of-fortune-teller"
                target="_blank"
                rel="noreferrer"
                className="hover:underline inline-flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                Original Repo
              </a>
            </div>
          </footer>
        </section>
      </main>

      {/* Mobile MD3 Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        style={{
          backgroundColor: 'var(--md-surface-container)',
          borderColor: 'var(--md-outline-variant)',
        }}
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t px-2 py-2 flex items-center justify-around backdrop-blur-md"
      >
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="flex flex-col items-center gap-1 px-2 py-1"
            >
              <span
                style={{
                  backgroundColor: active
                    ? 'var(--md-secondary-container)'
                    : 'transparent',
                  color: active
                    ? 'var(--md-on-secondary-container)'
                    : 'var(--md-on-surface-variant)',
                }}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* MD3 Project Detail Dialog */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--md-surface-container-high)',
              color: 'var(--md-on-surface)',
              borderColor: 'var(--md-outline-variant)',
            }}
            className="md3-card-anim w-full max-w-lg rounded-[28px] border p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    style={{
                      backgroundColor: 'var(--md-primary-container)',
                      color: 'var(--md-on-primary-container)',
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {selectedProject.org}
                  </span>
                  <span
                    style={{
                      backgroundColor: 'var(--md-secondary-container)',
                      color: 'var(--md-on-secondary-container)',
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {selectedProject.badge}
                  </span>
                  <span
                    style={{
                      backgroundColor: 'var(--md-surface-container-highest)',
                      color: 'var(--md-on-surface-variant)',
                    }}
                    className="px-2.5 py-1 rounded-lg font-mono text-xs"
                  >
                    {selectedProject.language}
                  </span>
                </div>
                <h3
                  id="project-dialog-title"
                  className="text-xl sm:text-2xl font-bold tracking-tight break-all"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                style={{
                  backgroundColor: 'var(--md-surface-container-highest)',
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p
              style={{ color: 'var(--md-on-surface-variant)' }}
              className="text-sm sm:text-base leading-relaxed"
            >
              {selectedProject.description}
            </p>

            <div
              style={{
                backgroundColor: 'var(--md-surface-container-low)',
                borderColor: 'var(--md-outline-variant)',
              }}
              className="rounded-2xl border p-4 space-y-2"
            >
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Highlights
              </div>
              <ul className="space-y-1.5 text-sm">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      style={{ color: 'var(--md-primary)' }}
                      className="w-4 h-4 shrink-0 mt-0.5"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                style={{ color: 'var(--md-primary)' }}
                className="px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-black/5"
              >
                Close
              </button>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: 'var(--md-primary)',
                  color: 'var(--md-on-primary)',
                }}
                className="md3-state-layer inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                <Github className="w-4 h-4" />
                Open on GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}