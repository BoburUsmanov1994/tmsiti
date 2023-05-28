import React, {useEffect} from 'react';
import Image from "next/image";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "../../../store";
import {get} from "lodash"

const Pofile = () => {
    const {data: session} = useSession()
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))
    useEffect(() => {
        if (get(session, 'user.token')) {
            setToken(get(session, 'user.token'));
        }
    }, [session])
    return (
        <div className={'inline-flex items-center'}>
            <span className={'mr-3'}>Ism Familiya</span>
            <Image width={48} height={48} className={'rounded-full'} src={'/images/avatar.png'} alt={'avatar'}/>
        </div>
    );
};

export default Pofile;