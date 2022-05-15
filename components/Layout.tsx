import Head from "next/head";
import React from "react";
import Header from "./Header";
interface LayoutInterface {
    children?: any,
    session?: any,
}

export default function Layout(props: LayoutInterface){
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <main>
                <Header />
                {props.children}
            </main>
        </div>
    )
}