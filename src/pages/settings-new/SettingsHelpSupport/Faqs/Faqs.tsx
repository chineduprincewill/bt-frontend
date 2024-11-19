import React from 'react';

import SettingsLayout from '../../SettingsLayout';
import Accordion from './Accordion';

export default function Faqs() {
    return (
        <SettingsLayout pageHeader="FAQs" subtitle="Control who can view your profile information">
            <Accordion items={ITEMS} />
        </SettingsLayout>
    );
}

const ITEMS = [
    {
        title: 'How do I join BlackAt?',
        body: 'An executive is a key figure in the C-suite, distinct from traditional roles like SVPs, CMOs, or CEOs. Their role is tailored towards fostering personal growth and achieving both short-term and long-term goals.',
    },
    {
        title: 'Title 2',
        body: 'Body 2',
    },
    {
        title: 'How do I join BlackAt?',
        body: 'An executive is a key figure in the C-suite, distinct from traditional roles like SVPs, CMOs, or CEOs. Their role is tailored towards fostering personal growth and achieving both short-term and long-term goals.',
    },
    {
        title: 'Title 2',
        body: 'Body 2',
    },
    {
        title: 'How do I join BlackAt?',
        body: 'An executive is a key figure in the C-suite, distinct from traditional roles like SVPs, CMOs, or CEOs. Their role is tailored towards fostering personal growth and achieving both short-term and long-term goals.',
    },
    {
        title: 'Title 2',
        body: 'Body 2',
    },
    {
        title: 'How do I join BlackAt?',
        body: 'An executive is a key figure in the C-suite, distinct from traditional roles like SVPs, CMOs, or CEOs. Their role is tailored towards fostering personal growth and achieving both short-term and long-term goals.',
    },
    {
        title: 'Title 2',
        body: 'Body 2',
    },
];
