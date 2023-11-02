"use client"

import { useState } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { Link } from "react-router-dom"

import { useCurrentPathInfo } from "@/hooks/use-current-pathinfo"
import { Editor } from "@/components/doc/editor"
import { Loading } from "@/components/loading"

import { useAllDays } from "./hooks"

export default function EverydayPage() {
  const params = useCurrentPathInfo()
  const { loading, days, hasNextPage, error, loadMore } = useAllDays(
    params.space
  )
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    // rootMargin: "0px 0px 200px 0px",
  })

  const [currentDay, setCurrentDay] = useState<string>("")

  const handleClick = (day: string) => {
    setCurrentDay(day)
  }

  return (
    <div className="prose mx-auto flex w-full flex-col gap-2 p-10 dark:prose-invert xs:p-5">
      {days.map((day, index) => {
        return (
          <div
            key={day.id}
            className="border-b border-slate-300"
            onClick={() => handleClick(day.id)}
          >
            <Link className="text-2xl" to={`/${params.database}/everyday/${day.id}`}>{day.id}</Link>
            <Editor
              docId={day.id}
              autoFocus={index === 0}
              isEditable
              placeholder=""
              disableSelectionPlugin
              disableSafeBottomPaddingPlugin
              disableUpdateTitle
              disableManuallySave={currentDay !== day.id}
              className="ml-0"
            />
          </div>
        )
      })}
      {(loading || hasNextPage) && (
        <div ref={sentryRef} className="mx-auto">
          <Loading />
        </div>
      )}
    </div>
  )
}
