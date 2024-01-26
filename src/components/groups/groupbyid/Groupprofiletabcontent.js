import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GrpActivity from './GrpActivity'

const Groupprofiletabcontent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('group-tab')
    const [TabState, setTabState] = useState('grpactivity')
    useEffect(() => {
        if (param === null) {
            setTabState('grpactivity')
        } else {
            setTabState(param)
        }
    }, [param, TabState])
    return (
        <>
            <div className="tab-content ">

                <div className={`tab-pane fade  ${TabState === 'grpactivity' ? 'active show' : ''}`} id="grpactivity" role="tabpanel" aria-labelledby="grpactivity-tab">
                    <GrpActivity />
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpabout' ? 'active show' : ''}`} id="grpabout" role="tabpanel" aria-labelledby="grpabout-tab">
                    b
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpmember' ? 'active show' : ''}`} id="grpmember" role="tabpanel" aria-labelledby="grpmember-tab">
                    c
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpsetting' ? 'active show' : ''}`} id="grpsetting" role="tabpanel" aria-labelledby="grpsetting-tab">
                    d
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpinvite' ? 'active show' : ''}`} id="grpinvite" role="tabpanel" aria-labelledby="grpinvite-tab">
                    e
                </div>
            </div>
        </>
    )
}

export default Groupprofiletabcontent