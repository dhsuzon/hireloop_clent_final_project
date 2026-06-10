const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const getCompanyJobs = async(companyId, status = 'active') => {
    try {
        const res = await fetch(`${baseURL}/api/jobs?companyId=${companyId}&status=${status}`)

        if (!res.ok) {
            // Handle non-200 responses (e.g. 404 HTML pages) without crashing JSON.parse
            return [];
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
};