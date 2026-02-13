import axios from "axios";

// formData should be JSON, endpoint str
export const FormDataCheck = async({ endpoint, formData, collectionName }) => {
    let url = 'http://localhost:4242/' + endpoint;

    try {
        const response = await axios.post(url, 
            { collectionName: collectionName, formData: formData },
            {
                headers: { 'Content-Type': 'application/json' },
            },
            
        );

        return { success: true, data: response.data };

    } catch (err) {
        return {
            success: false,
            error: err.response?.data?.message || err.message,
            errorData: err.response?.data
        };
    }
}
