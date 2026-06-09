// Validates the raw FormData object for the Post-a-Job form.
// Returns an object keyed by field name -> message (empty if valid).
export const validateJob = (data, { remote } = {}) => {
    const errors = {};

    const title = data.title ? .trim();
    if (!title) errors.title = "Job title is required.";
    else if (title.length < 3)
        errors.title = "Job title must be at least 3 characters.";

    if (!data.category) errors.category = "Please select a job category.";
    if (!data.type) errors.type = "Please select a job type.";

    if (!data.applicationDeadline) {
        errors.applicationDeadline = "Application deadline is required.";
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(data.applicationDeadline) < today)
            errors.applicationDeadline = "Deadline must be today or in the future.";
    }

    const min = data.salaryMin === "" ? null : Number(data.salaryMin);
    const max = data.salaryMax === "" ? null : Number(data.salaryMax);
    if (min !== null && (Number.isNaN(min) || min < 0))
        errors.salaryMin = "Enter a valid, non-negative amount.";
    if (max !== null && (Number.isNaN(max) || max < 0))
        errors.salaryMax = "Enter a valid, non-negative amount.";
    if (
        min !== null &&
        max !== null &&
        !errors.salaryMin &&
        !errors.salaryMax &&
        max < min
    )
        errors.salaryMax = "Max salary must be greater than or equal to min.";

    if (!remote && !data.location ? .trim())
        errors.location = "Location is required unless the role is remote.";

    if (!data.responsibilities ? .trim())
        errors.responsibilities = "Responsibilities are required.";
    if (!data.requirements ? .trim())
        errors.requirements = "Requirements are required.";
    console.log(errors);

    return errors;
};