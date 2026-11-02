exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const parsedBody = JSON.parse(event.body || '{}');
        const prompt = typeof parsedBody.prompt === 'string' ? parsedBody.prompt.trim() : '';

        if (!prompt) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Prompt is required.' }),
            };
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY environment variable is not set.');
        }

        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/interactions';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
                'Api-Revision': '2026-05-20',
            },
            body: JSON.stringify({
                model: 'gemini-3.8-flash',
                system_instruction:
                    'Bạn là cố vấn học tập đại học tận tâm, am hiểu quy chế đào tạo tín chỉ tại Việt Nam. Hãy phân tích bảng điểm chi tiết, khích lệ tinh thần sinh viên và đưa ra chiến lược học tập, cải thiện điểm số cụ thể, thực tế.',
                input: prompt,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini Interactions API Error:', errorBody);
            return {
                statusCode: response.status,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: `Gemini API Error (${response.status})`, details: errorBody }),
            };
        }

        const data = await response.json();

        // Trích xuất văn bản từ mảng steps của Interactions API
        let outputText = '';
        if (typeof data.output_text === 'string' && data.output_text) {
            outputText = data.output_text;
        } else if (Array.isArray(data.steps)) {
            outputText = data.steps
                .filter((step) => step.type === 'model_output' && Array.isArray(step.content))
                .flatMap((step) => step.content)
                .filter((part) => part.type === 'text' && typeof part.text === 'string')
                .map((part) => part.text)
                .join('\n');
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: outputText,
                interaction: data,
                // Giữ tương thích ngược với cấu trúc cũ nếu cần
                candidates: outputText
                    ? [{ content: { parts: [{ text: outputText }] } }]
                    : [],
            }),
        };
    } catch (error) {
        console.error('Serverless function error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};
