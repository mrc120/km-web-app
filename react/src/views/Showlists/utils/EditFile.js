import React from 'react';
import { Button } from 'react-bootstrap'
import useToggle from "../../../hooks/useToggle"
import EditModal from "../../../components/Modal/EditModal"
import DeleteModal from "../../../components/Modal/DeleteModal"


const EditFile = ({ id, title, description }) => {

    const [showEditModal, setEditModal] = useToggle(false);
    const [showDeleteModal, setDeleteModal] = useToggle(false);

    return (
        <>
            <div className="row ">
                <div className="col-sm px-0 ml-3 ">
                    <Button style={{ margin: '-1px 0 -1px 0px' }} className="btn form-control px-0 btn-danger border-right border-bottom border-left rounded-0"
                        onClick={() => setEditModal()}
                    > Edytuj
                    </Button>
                </div>
                <div className="col-sm px-0 ml-3 ">
                    <Button style={{ margin: '-1px 0 -1px 0px' }} className="btn form-control px-0 btn-danger border-right border-bottom border-left rounded-0"
                        onClick={() => setDeleteModal()}
                    > Usuń
                    </Button>
                </div>
            </div>
            {showEditModal && (
                <EditModal
                    id={id}
                    title={title}
                    description={description}
                    showModal={showEditModal}
                    toggle={setEditModal} />
            )}
            {showDeleteModal && (
                <DeleteModal
                    id={id}
                    title={title}
                    showModal={showDeleteModal}
                    toggle={setDeleteModal} />
            )}
        </>
    );
}

export default EditFile