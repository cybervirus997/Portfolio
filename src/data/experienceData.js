export const experienceData = [
    {
        id: 1,
        company: 'GlobalLogic (Hitachi Group)',
        jobtitle: 'Senior Software Engineer',
        startYear: 'May 2025',
        endYear: 'Present',
        location: 'Bengaluru, Karnataka, India · Hybrid',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQEcwaYik2791g/company-logo_100_100/B56ZV9kVCfHoAQ-/0/1741568430537/globallogic_logo',
        description: 'Senior Software Engineer - Full-time',
        clients: 'Cengage Group & FIS (Fidelity Information Services)',
        skills: ['React', 'React Native', 'TypeScript', 'OpenAI API', 'LLM Streaming', 'Deepgram STT', 'AI'],
        highlights: [
            'Building React-based AI student chatbot with real-time LLM response streaming for Cengage\'s global learning platform',
            'Integrated OpenAI API and in-house LLM backends via unified frontend abstraction layer enabling seamless model switching without UI-layer changes',
            'Implemented Deepgram STT, text-to-speech, and native fallback STT for smooth voice interaction in the chatbot',
            'Added complex calculus rendering via math.live for structured academic content display',
            'Built session-aware multi-turn conversation state management improving chatbot response accuracy',
            'Implemented structured markdown rendering for AI responses including code blocks, lists, and academic content',
            'Building enterprise React Native banking features for FIS Beacon app within a monorepo architecture (transfer & recurring transaction modules)',
            'Architected unified Celebrus observability framework capturing UI events, consent tracking, and transaction telemetry'
        ]
    },
    {
        id: 2,
        company: 'Oolka — AI Credit Score LevelUp',
        jobtitle: 'Senior Software Engineer',
        startYear: 'Nov 2024',
        endYear: 'May 2025',
        location: 'Bengaluru, Karnataka, India · On-site',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQG6bB5NmSM5pw/company-logo_100_100/company-logo_100_100/0/1720009738217/oolka_logo',
        description: 'Senior Software Engineer - Full-time · FinTech Credit Intelligence Platform · 500K+ Users',
        skills: ['React Native', 'Next.js', 'Redux', 'Mobile Security', 'Juspay', 'SSL Pinning'],
        highlights: [
            'Owned end-to-end frontend development of a credit health platform — animated credit dashboards, EMI calculators, and CRIF/CIBIL score tracking',
            'Eliminated ~90% of duplicate referral fraud by engineering IMEI-based OneLink acquisition tracking system',
            'Delivered zero-gap payment reconciliation via complete Juspay multi-state flows (success/failure/pending), eliminating silent payment failures',
            'Reduced feature development time by ~25–30% through modular component architecture with shared hooks library',
            'Hardened mobile app security with SSL pinning, biometric authentication, encrypted secure storage, and root/jailbreak detection'
        ]
    },
    {
        id: 3,
        company: 'Trinkerr / TIQS',
        companyNote: 'Acquired by Flipkart – SuperMoney',
        jobtitle: 'Software Engineer → SDE-1',
        isGrouped: true,
        roles: [
            { title: 'SDE-1 · TIQS', period: 'Jan 2024 – Nov 2024' },
            { title: 'Software Engineer · Trinkerr', period: 'Aug 2022 – Jan 2024' },
            { title: 'Associate Software Engineer · Trinkerr', period: 'Dec 2021 – Aug 2022' },
        ],
        startYear: 'Dec 2021',
        endYear: 'Nov 2024',
        location: 'Bengaluru, Karnataka, India',
        logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGYSeAfdQKy4g/company-logo_100_100/company-logo_100_100/0/1729750495292/trinkerr_logo',
        description: 'Real-Time Options Trading Platform · React Native · WebSocket Systems · 1.6M+ Users',
        skills: ['React Native', 'React.js', 'TypeScript', 'WebSockets', 'Next.js', 'Redux', 'D3.js', 'TradingView'],
        highlights: [
            'Architected synchronized mirror-scroll Options Chain UI — bidirectional scrollable Put/Call grid with locked headers consuming multiple live WebSocket streams simultaneously',
            'Engineered multi-stream WebSocket infrastructure sustaining sub-100ms UI refresh for 1.6M+ users across Greeks, OI, IV, bid/ask, and market depth feeds',
            'Reduced Options Chain frame drops by ~60% through render pipeline optimization — memoization, selective re-rendering, and efficient diff strategies',
            'Cut app memory footprint by ~35% via virtualized list recycling across watchlist and options chain components',
            'Built real-time portfolio, order, and position management systems with zero data consistency issues under peak trading load',
            'Integrated TradingView and custom D3.js chart-based trading workflows increasing user engagement with advanced order execution',
            'Sustained 99.99% crash-free sessions — platform acquired by Flipkart (SuperMoney), validating engineering quality',
            'Integrated Mixpanel, CleverTap, UXCam, and LogRocket analytics enabling full user journey observability'
        ]
    },
    {
        id: 4,
        company: 'Electronics Corporation of India Limited (ECIL)',
        jobtitle: 'Research Trainee',
        startYear: 'Jan 2021',
        endYear: 'Jul 2021',
        location: 'Hyderabad, Telangana, India · On-site',
        logo: 'https://media.licdn.com/dms/image/v2/C560BAQEx2QeDGSRREA/company-logo_100_100/company-logo_100_100/0/1630579221745/electronics_corporation_of_india_limited_ecil_logo',
        description: 'Research Trainee - Apprenticeship',
        skills: ['IoT', 'Embedded Systems', 'Lithography', 'IC Design', 'Electronics'],
        highlights: [
            'Focused on development and implementation of IoT and embedded systems',
            'Explored advanced lithography techniques and IC design methodologies',
            'Designed integrated circuits (ICs) to enhance electronic functionality',
            'Collaborated with cross-functional teams on embedded solutions and innovation'
        ]
    }
]
