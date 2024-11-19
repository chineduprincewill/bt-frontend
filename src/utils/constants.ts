import { IDropdownSearchOption } from '@components/DropdownSearch/DropdownSearch';

export const MASTERCLASS_CATEGORIES = [
    { label: 'Arts and Crafts', value: 'Arts and Crafts' },
    { label: 'Music and Performing Arts', value: 'Music and Performing Arts' },
    { label: 'Culinary Arts', value: 'Culinary Arts' },
    { label: 'Writing and Literature', value: 'Writing and Literature' },
    { label: 'Film and Television', value: 'Film and Television' },
    { label: 'Business and Entrepreneurship', value: 'Business and Entrepreneurship' },
    { label: 'Technology and Programming', value: 'Technology and Programming' },
    { label: 'Design and Photography', value: 'Design and Photography' },
    { label: 'Health and Wellness', value: 'Health and Wellness' },
    { label: 'Science and Education', value: 'Science and Education' },
    { label: 'Hobbies and Lifestyle', value: 'Hobbies and Lifestyle' },
    { label: 'Sports and Athletics', value: 'Sports and Athletics' },
];

export const JOB_TYPES = [
    { label: 'Software Engineer', value: 'Software Engineer' },
    { label: 'Data Scientist', value: 'Data Scientist' },
    { label: 'Graphic Designer', value: 'Graphic Designer' },
    { label: 'Financial Analyst', value: 'Financial Analyst' },
    { label: 'Marketing Manager', value: 'Marketing Manager' },
    { label: 'Human Resources Manager', value: 'Human Resources Manager' },
    { label: 'Sales Representative', value: 'Sales Representative' },
    { label: 'Customer Service Representative', value: 'Customer Service Representative' },
    { label: 'Project Manager', value: 'Project Manager' },
    { label: 'Medical Doctor', value: 'Medical Doctor' },
    { label: 'Teacher / Educator', value: 'Teacher / Educator' },
    { label: 'Lawyer / Attorney', value: 'Lawyer / Attorney' },
    { label: 'Civil Engineer', value: 'Civil Engineer' },
    { label: 'Architect', value: 'Architect' },
    { label: 'Chef / Cook', value: 'Chef / Cook' },
];

export const PAY_FREQUENCY_OPTIONS: IDropdownSearchOption[] = [
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Bi-monthly or Semi-monthly', value: 'Bi-monthly or Semi-monthly' },
    { label: 'Bi-weekly', value: 'Bi-weekly' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Annually', value: 'Annually' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Bi-annually', value: 'Bi-annually' },
    { label: 'Customer Service / Support', value: 'Customer Service / Support' },
];

export const JOB_CATEGORIES = [
    { label: 'Information Technology (IT)', value: 'Information Technology (IT)' },
    { label: 'Data Science / Analytics', value: 'Data Science / Analytics' },
    { label: 'Design / Creative', value: 'Design / Creative' },
    { label: 'Finance / Accounting', value: 'Finance / Accounting' },
    { label: 'Marketing / Advertising', value: 'Marketing / Advertising' },
    { label: 'Human Resources (HR)', value: 'Human Resources (HR)' },
    { label: 'Sales / Business Development', value: 'Sales / Business Development' },
    { label: 'Customer Service / Support', value: 'Customer Service / Support' },
    { label: 'Project Management', value: 'Project Management' },
    { label: 'Healthcare / Medicine', value: 'Healthcare / Medicine' },
    { label: 'Education / Teaching', value: 'Education / Teaching' },
    { label: 'Legal', value: 'Legal' },
    { label: 'Engineering (Civil)', value: 'Engineering (Civil)' },
    { label: 'Architecture / Planning', value: 'Architecture / Planning' },
    { label: 'Food Services / Hospitality', value: 'Food Services / Hospitality' },
];

export const MENTORSHIP_STATUSES = [
    { label: 'Pending', value: 'pending' },
    { label: 'Active', value: 'active' },
];

export const MENTORSHIP_EXPERTISE = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
];

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TIME_SLOTS = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, '0');
    const min = String((i % 2) * 30).padStart(2, '0');
    const value = `${hour}:${min}`;
    return { label: value, value };
});
