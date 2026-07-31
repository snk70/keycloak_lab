import { cookies } from "next/headers";
export default async function DashboardPage() {
    const cookieStore = await cookies();

    const _AllCookie = cookieStore.getAll();
    return (
        <main>
            <h1>Dashboard</h1>

            <p>
                Your Server Cookies:
                {JSON.stringify(_AllCookie)}
            </p>
            <a href="/api/auth/session" target="_blank">
                <p>Go to Sessions Page</p>
            </a>
        </main>
    );
}



// export default async function Page() {
//     const cookieStore = await cookies();

//     const _AllCookie = cookieStore.getAll();


//     // Render data...
//     return (
//         <div>
//             {JSON.stringify(_AllCookie)}
//         </div>
//     );
// }