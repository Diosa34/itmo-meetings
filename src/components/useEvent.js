import useSWR from "swr";
import {getFetcher} from "./getFetcher";

export default function useEvent (id, token) {
    const { data, error, isLoading } = useSWR([`http://localhost:8000/meeting/${id}/`, token], ([url, token]) => getFetcher(url, token))

    return {
        event: data,
        isLoading,
        error: error
    }
}