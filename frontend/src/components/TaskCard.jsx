import './TaskCard.css'

function TaskCard({ task, onDelete, onEdit, onComplete }) {
    return (
        <article className="task-card" data-status={task.status}>
            <div className="task-card-header">
                <div>
                    <small className="task-id">Task #{task.id}</small>
                    <h3 className="task-title">{task.title}</h3>
                </div>

                <div className="task-card-actions">
                    {task.status !== 'done' && (
                        <>
                            <button type="button" className="task-complete-btn" onClick={() => onComplete(task.id)}>
                                <i className="bi bi-check-lg"></i>
                            </button>
                            <button type="button" className="task-edit-btn" onClick={() => onEdit(task)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        </>
                    )}

                    <button type="button" className="task-delete-btn" onClick={() => { if (window.confirm('Delete this task?')) onDelete(task.id) }}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            {task.description && (
                <div className="task-card-body">
                    <p className="task-description">{task.description}</p>
                </div>
            )}
        </article>
    )
}

export default TaskCard