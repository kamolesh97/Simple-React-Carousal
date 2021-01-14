import React, { useState } from "react";

// COMPONENTS IMPORT
import Carousal from "../../Components/Carousal";

// TS TYPES IMPORT
import * as types from "../../Constants/types";

// PROP TYPE DEF
interface HomeProps {}

// COMPONENTS
const Home: React.FC<HomeProps> = (): JSX.Element => {
    // STATE
    const [data, setDate] = useState<Array<types.CarousalData>>([
        {
            title: "First Block",
            images: ["https://loremflickr.com/1280/720?random=1", "https://loremflickr.com/1280/720?random=2", "https://loremflickr.com/1280/720?random=3"],
        },
        {
            title: "Second Block",
            images: ["https://loremflickr.com/1280/720?random=4", "https://loremflickr.com/1280/720?random=5", "https://loremflickr.com/1280/720?random=6"],
        },
        {
            title: "Third Block",
            images: ["https://loremflickr.com/1280/720?random=7", "https://loremflickr.com/1280/720?random=8", "https://loremflickr.com/1280/720?random=9"],
        },
        {
            title: "Fourth Block",
            images: ["https://loremflickr.com/1280/720?random=10", "https://loremflickr.com/1280/720?random=11", "https://loremflickr.com/1280/720?random=12"],
        },
    ]);

    return (
        <React.Fragment>
            <Carousal data={data} />
        </React.Fragment>
    );
};

export default Home;
