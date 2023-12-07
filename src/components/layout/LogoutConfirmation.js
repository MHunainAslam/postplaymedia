import React from 'react'

const LogoutConfirmation = ({ logout }) => {
    return (
        <>


            <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content logout-modal py-4">
                       
                        <div class="modal-body heading text-center">
                            Are you sure ?
                        </div>
                        <div class="modal-footer bg-transparent justify-content-center border-0 pt-4">
                            <button type="button" class="btn secondary-btn close-logout-modal px-5 text-white" data-bs-dismiss="modal">No</button>
                            <button type="button" onClick={logout} class="btn primary-btn px-5"><p>Yes</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogoutConfirmation