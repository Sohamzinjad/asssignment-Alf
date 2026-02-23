import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simulate a 1-second delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Message received successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
