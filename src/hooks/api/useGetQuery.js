import {useQuery} from '@tanstack/react-query';
import {request} from '@/services/api';
import {toast} from 'react-hot-toast';
import {useTranslation} from 'react-i18next';
import {useSession} from "next-auth/react";
import {get} from "lodash";

const useGetQuery = ({
                         key = 'get-all',
                         url = '/',
                         params = {},
                         headers = {},
                         showSuccessMsg = false,
                         showErrorMsg = false,
                         enabled = true,
                     }) => {
    const {t} = useTranslation();
    const {data: session} = useSession()
    const {
        isLoading,
        isError,
        data,
        error,
        isFetching,
    } = useQuery([key, params], () => request.get(url, {
        params,
        headers: get(session, 'user.token') ? {...headers, token: `${get(session, 'user.token', null)}`} : headers
    }), {
        keepPreviousData: true,
        onSuccess: () => {
            if (showSuccessMsg) {
                toast.success(t('SUCCESS'));
            }
        },
        onError: (data) => {
            if (showErrorMsg) {
                toast.error(t(`ERROR`));
            }
        },
        enabled
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching
    };
};

export default useGetQuery;