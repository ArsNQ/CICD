import styles from "./SearchInput.module.css";
import CSS from 'csstype';
import cn from "classnames"
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SearchPlace} from "../../../actions/searchPlace"

interface SearchInput {
    placeholder?: string,
    className?: string,
    style?: CSS.Properties,
    setterSeeAroundValue: any
}


const SearchInput = ({
                        placeholder,
                        className,
                        style,
                        setterSeeAroundValue,
                     }: SearchInput
) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [recoArray, setRecoArray] = useState([]);
    const useChange = useCallback((event) => {
        const value = event.target.value
        setInputValue(value);
        setterSeeAroundValue("");
        SearchPlace(value).then((result: any) => setRecoArray(result || []));
    },[])

    const pickAutoCompleteItem = (address: any) => {
        setInputValue(address.description)
        setRecoArray([])
        setterSeeAroundValue(address.place_id)
    }

    return(
        <div className={styles.inputContainer}>
            <input
                placeholder={placeholder}
                style={style}
                className={cn(styles.input, className)}
                value={inputValue}
                onChange={useChange}
            />
            {recoArray.length > 0 && <div className={styles.dropDown}>
                {recoArray.map((address: any, index: number) => (
                    <div key={index} onClick={() => pickAutoCompleteItem(address)}
                         className={styles.dropDownItem}>{address.description}</div>
                ))}
            </div>}
        </div>
    )
}

export default SearchInput;
