'use client'
import {useInView} from 'react-intersection-observer'
import {useState, useEffect} from 'react'

export function useAtBottom() {

    const { ref, entry, inView } = useInView({
        trackVisibility: true,
        delay: 100,
        rootMargin: '0px 0px -150px 0px',
    })
    useEffect(() => {
        //console.log(`is in view?`, inView)
    }, [inView, ref, entry])



    return {
        isAtBottom: inView,
        observer: entry,
        ref,
    }
}