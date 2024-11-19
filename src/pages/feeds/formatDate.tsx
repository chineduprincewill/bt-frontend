// Function to format date as "14 Jan"

import moment from "moment";

export function formatDate(dateString: string): string {
    const parsedDate = moment(dateString).format(
        'DD MMM'
    )

    return parsedDate;
}
