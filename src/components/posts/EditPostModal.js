import React from 'react'
import PostArea from './PostArea'
import EditPostArea from './EditPostArea'

const EditPostModal = ({ postin, prevData, EditDone, setEditDone, editmodalid }) => {
    return (
        <>


            <div className="modal modal-lg fade" id={editmodalid} tabIndex="-1" aria-labelledby="EditPostModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h1 className="modal-title fs-5" id="EditPostModalLabel">Modal title</h1> */}
                            <button type="button" className={`btn-close edit-modal-close ${editmodalid}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <EditPostArea postin={postin} prevData={prevData} setEditDone={setEditDone} EditDone={EditDone} editmodalid={editmodalid} />
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPostModal