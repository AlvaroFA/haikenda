import { useState } from 'react';

const OPERATIONS = {
    FETCH: 'FETCH',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

const initialOperationResult = {};


export default function useOperationState(){

    const [operationResult, setOperationResult] = useState(initialOperationResult);

    const hasFailed = (operation) => {
        return operationResult.failed && operationResult.operation===operation
    }

    const failOperation = (operation, error)=>{
        let reason = error || error.message;
        if(error.response && error.response.data && error.response.data.error) reason = error.response.data.error;
        const op = {
            failed: true,
            operation: operation,
            reason
        };
        console.warn(op);
        setOperationResult(op);
    }

    const isWaitingForOperation = ()=> {
        return operationResult.waiting;
    }


    const startOperation = (operation)=> {
        setOperationResult({
            waiting: true,
            operation
        });
    }

    const successOperation = (operation) => {
        setOperationResult({
            success: true,
            operation
        });
    }

    const clearOperation = () => {
        setOperationResult(initialOperationResult);
    }

    return {
        operation: operationResult,
        OPERATIONS,
        hasFailed,
        isWaitingForOperation,
        failOperation,
        successOperation,
        startOperation,
        clearOperation
    }
}