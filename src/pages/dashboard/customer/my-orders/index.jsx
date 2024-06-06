import React, {useRef, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get, head} from "lodash";
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
import StarRating from "@/components/stars/star-rating";
import starRating from "@/components/stars/star-rating";







const Index = () => {
    const [pageSize, setPageSize] = useState(48);
    const starRatingRef = useRef();
    const [comments, setComments] = useState({});
    const [isOpen, setIsOpen] = useState(false)
    const {data: session} = useSession();
    const productCategoryRef = useRef(null);
    const ratingRef = useRef(null);
    const commentRef = useRef(null);
    const productIdRef = useRef(null);
    const token = useSettingsStore(state => get(state, 'token', null))

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);



    const {data: orderListCustomer} = useGetQuery({
        key: KEYS.orderListCustomer,
        url: URLS.orderListCustomer
    })




    const {data: user} = useGetQuery({
        key: KEYS.getCustomer,
        url: URLS.getCustomer,
        headers: {token: token ?? `${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token') || token)
    })

    const {mutate: sendComment, isLoadingComment} = usePostQuery({
        listKeyId: "comment-one",
    });




    const { mutate: sendOrderStatus, isLoading } = usePostQuery({
        listKeyId: "customer-info-one",
    });



    const handleSendOrderStatus = (id, selectStatus) => {
        const selectedId = +id
        sendOrderStatus({
            url: `${URLS.sendOrderStatus}${selectedId}/`,
            attributes: {
                "order_status": `${selectStatus}`
            }
        })

    }


    const handleSendComment = () => {
        const enteredProductCategory = productCategoryRef.current?.textContent;
        const selectedStars = starRatingRef.current.map(star => star.value);
        const enteredComment = commentRef.current?.value;
        const customer = +get(user, "data.id");
        const productId = productIdRef.current?.textContent;

        const commentInfo = {
            product_category: enteredProductCategory,
            ad_id: productId,
            comment: enteredComment,
            rating: selectedStars,
            customer: customer,
        }

        if (!enteredComment) {
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
                classnames: "hidden"
            },
            {
                title: "Mahsulot turi",
                key: "ad_id",
                classnames: "hidden"
            },

            {
                title: "Yetkazib beruvchi",
                key: "company_name",
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
            render: ({row}) =>
                get(row, "order_status") === "new_order" ?
                    <div className={"flex flex-col gap-y-2"}>
                        <button onClick={() => handleSendOrderStatus(get(row, "id"), "customer_canceled")}
                                className={"bg-red-600 hover:bg-red-700 active:bg-red-500 text-white py-2 px-8 rounded-[6px]"}>
                            Bekor qilish
                        </button>
                    </div>
                    : get(row, "order_status") === "accepted" ?
                        <div>
                            <p className={"bg-green-600 hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"}>Buyurtma
                                qabul qilindi</p>
                        </div> : get(row, "order_status") === "sent" ?
                            <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                <p>Buyurtma yetkazildi</p>
                                <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                            </div> : get(row, "order_status") === "customer_canceled" ?
                                <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                    <p>Buyurtmani bekor qildingiz</p>
                                    <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                </div> : get(row, "order_status") === "canceled" ?
                                    <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                        <p>Yetkazib beruvchi mahsulotni bekor qildi</p>
                                        <Image src={"/images/error.png"} alt={"error"} width={22} height={22}/>
                                    </div> : ""
            ,
            classnames: "text-center",
        },
        {
            title: "Sharh qoldirish",
            key: "",
            render: () => <button onClick={openModal}>
                Sharh qoldirish
            </button>,
            classnames: "text-center",
        },

    ];


    return (
        <Dashboard>
            <Subheader title={'Mening buyurtmalarim'}/>
            <div className="p-7">
                <GridView columns={columns} key={KEYS.orderListCustomer} url={URLS.orderListCustomer}
                          defaultPageSize={pageSize}/>
            </div>
            {isOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded shadow-md w-[1000px] h-auto flex flex-col">
                        <Image onClick={closeModal} src={"/icons/closeModal.svg"} alt={"close"} width={30} height={30}/>
                        <textarea ref={commentRef} rows={10} placeholder={"Izoh qoldirish"}
                                  className={"border p-3 shadow-lg rounded-[6px]"}>

                      </textarea>

                        <StarRating ref={starRatingRef}/>


                        {get(orderListCustomer, "data.results", []).map((item, index) =>
                            <div key={index} className={"hidden"}>
                                <p ref={productCategoryRef}>{head(get(item, "product_category"))}</p>
                                <p ref={productIdRef}>{head(get(item, "ad_id"))}</p>
                            </div>
                            )}

                        <button onClick={handleSendComment}>yuborish</button>
                    </div>
                </div>
            }
</Dashboard>
        )

}

export default Index;