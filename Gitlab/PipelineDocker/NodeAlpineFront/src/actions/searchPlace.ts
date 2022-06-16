import axios from "axios";

export const SearchPlace : any  = async (inputValue: string) => {
    if (inputValue.length <= 3 ) return [];
    return axios.get(`${process.env.REACT_APP_API}/places/autocomplete?input=${inputValue}`)
        .then((res) => {
           return res.data.data.predictions
        })
}

export const getFullDataPlaceId : any  = async (place_id: string) => {
    return axios.get(`${process.env.REACT_APP_API}/places/getLocalisationPlace?place_id=${place_id}`)
        .then((res) => {
            return res.data.data[0]
        })
}
