import React, {useRef, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import {URLS} from "@/constants/url";
import GridView from "@/containers/grid-view";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import usePostQuery from "@/hooks/api/usePostQuery";
import {useSettingsStore} from "@/store";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";






const Index = () => {
    const [pageSize, setPageSize] = useState(48);
    const [comments, setComments] = useState({});
    const {data: session} = useSession();
    const productCategoryRef = useRef(null);
    const ratingRef = useRef(null);
    const commentRef = useRef(null);
    const productIdRef = useRef(null);

    const token = useSettingsStore(state => get(state, 'token', null))

    const {data: user} = useGetQuery({
        key: KEYS.getCustomer,
        url: URLS.getCustomer,
        headers: {token: token ?? `${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token') || token)
    })

    const {mutate: sendComment, isLoading} = usePostQuery({
        listKeyId: "comment-one",
    });


    const handleSendComment = () => {
        const enteredProductCategory = productCategoryRef.current?.textContent;
        const enteredRating = ratingRef.current?.textContent;
        const enteredComment = commentRef.current?.textContent;
        const customer = +get(user, "data.id");
        const productId = productIdRef.current?.textContent;

        const commentInfo = {
            product_category: enteredProductCategory,
            ad_id: productId,
            comment: enteredComment,
            rating: enteredRating,
            customer: customer,
        }

        if (enteredComment) {
            setComments(commentInfo)

            sendComment({
                    url: URLS.sendComment,
                    attributes: commentInfo
                },
                {
                    onSuccess: () => {
                        toast.success('Siz bergan izoh va baho yetkazib beruvchiga yuborildi', {position: 'top-right'})
                    }
                }
            )
        }
    }


        const columns = [
            {
                title: "№",
                key: "id",
                render: ({index}) => <span>{index}</span>,
            },
            {
                title: "Mahsulot turi",
                key: "product_category",

            },
            {
                title: "Yetkazib beruvchi",
                key: "company",
            },
            {
                title: "Kodi",
                key: "product_code",
            },
            {
                title: "Nomi",
                key: "product_name",
            },
            {
                title: "Telefon raqami",
                key: "phone",
            },
            {
                title: "Narxi",
                key: "price",
                classnames: "text-center",
            },
            {
                title: "Miqdori",
                key: "quantity",
                classnames: "text-center",
            },
            {
                title: "Buyurtmaning holati",
                key: "order_status",
                classnames: "text-center",
            },

        ];


        return (
            <Dashboard>
                <Subheader title={'Mening buyurtmalarim'}/>
                <div className="p-7">
                    <GridView columns={columns} key={KEYS.orderListCustomer} url={URLS.orderListCustomer} defaultPageSize={pageSize}/>
                </div>
            </Dashboard>
        )

}

export default Index;