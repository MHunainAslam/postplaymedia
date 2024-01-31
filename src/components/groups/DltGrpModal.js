import React from 'react'

const DltGrpModal = ({ dltgrp }) => {
    return (
        <>


            <div className="modal fade" id="DltGroup" tabIndex="-1" aria-labelledby="DltGroupLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content logout-modal py-4">

                        <div className="modal-body heading text-center">
                            Want To Delete This Group ?
                        </div>
                        <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                            <button type="button" className="btn secondary-btn close-grp-dlt-modal px-5 text-white" data-bs-dismiss="modal">No</button>
                            <button type="button" onClick={dltgrp} className="btn primary-btn px-5"><p>Yes</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DltGrpModal