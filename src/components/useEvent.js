import useSWR from "swr";
import {getFetcher} from "./getFetcher";
import HOST from "../host";

export default function useEvent (id, token) {
    const { data, error, isLoading } = useSWR([`${HOST}/meeting/${id}/`, token], ([url, token]) => getFetcher(url, token))

    return {
        event: data,
        isLoading,
        error: error
    }
}