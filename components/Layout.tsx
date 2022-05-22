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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main>
                <Header />
                {props.children}
            </main>
        </div>
    )
}