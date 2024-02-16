import React from 'react'
import PostArea from './PostArea'
import EditPostArea from './EditPostArea'

const EditPostModal = ({ postin, prevData, EditDone, setEditDone, editmodalid }) => {
    return (
        <>


            <div class="modal modal-lg fade" id={editmodalid} tabindex="-1" aria-labelledby="EditPostModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            {/* <h1 class="modal-title fs-5" id="EditPostModalLabel">Modal title</h1> */}
                            <button type="button" class="btn-close edit-" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <EditPostArea postin={postin} prevData={prevData} setEditDone={setEditDone} EditDone={EditDone}/>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPostModal