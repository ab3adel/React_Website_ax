import { useState, useEffect, useRef } from 'react';

/**
 * "This function will return a ref, isComponentVisible, and setIsComponentVisible. 
 * 
 * The ref is used to determine if the user has clicked outside of the component. 
 * 
 * The isComponentVisible is used to determine if the component is visible or not. 
 * 
 * The setIsComponentVisible is used to set the isComponentVisible state."
 * @returns An object with three properties:
 * ref: A reference to the DOM element that is being rendered.
 * isComponentVisible: A boolean value that indicates whether the component is visible or not.
 * setIsComponentVisible: A function that sets the isComponentVisible value.
 */
export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}