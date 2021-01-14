import React, { useEffect, useState, createRef, RefObject } from "react";
import { StyleSheet, css, StyleDeclarationValue } from "aphrodite/no-important";

// TS TYPES IMPORT
import * as types from "../../Constants/types";

// PROP TYPE DEF
interface ArrowProps {
    direction: "left" | "right" | "up" | "down";
    style?: StyleDeclarationValue;
    onClick?: Function;
    disabled?: boolean;
}
interface Props {
    data: Array<types.CarousalData>;
}

const Arrow: React.FC<ArrowProps> = ({ direction, style, onClick, disabled }): JSX.Element => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 496 496"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css(styles.arrow, !disabled && styles.hover, style)}
            onClick={() => onClick && !disabled && onClick()}
        >
            {direction === "left" && (
                <path
                    d="M248 496C111 496 0 385 0 248C0 111 111 0 248 0C385 0 496 111 496 248C496 385 385 496 248 496ZM134.1 265L269.6 400.5C279 409.9 294.2 409.9 303.5 400.5L320.5 383.5C329.9 374.1 329.9 358.9 320.5 349.6L218.9 248L320.5 146.4C329.9 137 329.9 121.8 320.5 112.5L303.5 95.5C294.1 86.1 278.9 86.1 269.6 95.5L134.1 231C124.7 240.4 124.7 255.6 134.1 265Z"
                    fill={disabled ? "#a3a3a3" : "white"}
                />
            )}
            {direction === "right" && (
                <path
                    d="M248 0C385 0 496 111 496 248C496 385 385 496 248 496C111 496 0 385 0 248C0 111 111 0 248 0ZM361.9 231L226.4 95.5C217 86.1 201.8 86.1 192.5 95.5L175.5 112.5C166.1 121.9 166.1 137.1 175.5 146.4L277.1 248L175.5 349.6C166.1 359 166.1 374.2 175.5 383.5L192.5 400.5C201.9 409.9 217.1 409.9 226.4 400.5L361.9 265C371.3 255.6 371.3 240.4 361.9 231Z"
                    fill={disabled ? "#a3a3a3" : "white"}
                />
            )}
        </svg>
    );
};

// COMPONENTS
const Carousal: React.FC<Props> = ({ data }): JSX.Element => {
    // STATE
    const [currSlide, setCurrSlide] = useState<number>(0);
    const [carousalRefs, setCarousalRefs] = useState<Array<RefObject<HTMLDivElement>> | []>([]);

    // HOOKS
    useEffect(() => {
        setCarousalRefs((carousalRefs) =>
            Array(data.length)
                .fill(0)
                .map((_, i) => carousalRefs[i] || createRef())
        );
    }, [data.length]);

    return (
        <React.Fragment>
            <div className={css(styles.carousalContainer)}>
                {data.map((item: types.CarousalData, index: number) => {
                    const randomImageIndex = Math.floor(Math.random() * item.images.length);
                    return (
                        <div key={index.toString()} className={css(styles.carousalImageContainer)} ref={carousalRefs[index]}>
                            <img src={item.images[randomImageIndex]} className={css(styles.carousalImage)} alt={`new random carousal slide ${index}`} />
                        </div>
                    );
                })}
            </div>
            <Arrow
                direction={"left"}
                disabled={currSlide === 0}
                onClick={() => {
                    carousalRefs[currSlide - 1].current?.scrollIntoView({ behavior: "smooth" });
                    setCurrSlide(currSlide - 1);
                }}
                style={styles.leftArrow}
            />
            <Arrow
                direction={"right"}
                disabled={currSlide === data.length - 1}
                onClick={() => {
                    carousalRefs[currSlide + 1].current?.scrollIntoView({ behavior: "smooth" });
                    setCurrSlide(currSlide + 1);
                }}
                style={styles.rightArrow}
            />
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    carousalContainer: {
        display: "flex",
        overflow: "hidden",
    },
    carousalImageContainer: {
        display: "flex",
    },
    carousalImage: {
        height: "100vh",
        width: "100vw",
    },
    arrow: {
        position: "absolute",
        top: "50%",
    },
    hover: {
        cursor: "pointer",
    },
    leftArrow: {
        left: "1rem",
    },
    rightArrow: {
        right: "1rem",
    },
});

export default Carousal;
