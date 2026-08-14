import { cookies } from "next/headers";
export default async function DashboardPage() {
    const cookieStore = await cookies();

    const _AllCookie = cookieStore.getAll();
    return (
        <main>
            <h1>Dashboard</h1>
            <hr />
            <a href="/api/auth/login" target="_blank">
                <h2>Login Page</h2>
            </a>
            <hr />
            <p>
                Your Server Cookies:
                {JSON.stringify(_AllCookie)}
            </p>
            <hr />
            <a href="/api/auth/session" target="_blank">
                <p>Go to Sessions Page</p>
            </a>
            <hr />

            <a href="/api/auth/access-token" target="_blank">
                <p>Go to Access Token Page</p>
            </a>
            <hr />

            <a href="/api/auth/logout" target="_blank">
                <p>Logout</p>
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