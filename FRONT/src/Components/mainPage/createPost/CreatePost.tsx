import * as React from 'react';
import Style from './CreatePost.module.css';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFile } from '@fortawesome/free-solid-svg-icons';
import { Security } from '../../../Tools/Security';
import { REGEX_TEXTE } from '../../../Tools/config';
import { PostController } from '../../../Controllers/PostController';
import { newPost } from '../../../Types/Post';
import { UserContext } from '../../../Context/UserContext';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreatePostProps {
}

type Errors = {
    errorContent: boolean,
    errorFile: boolean,
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
    const { token, id_user } = useContext(UserContext);

    const [content, setContent] = useState<string>("")
    const [file, setFile] = useState<File| null>(null)
    const [isClick, setIsClick] = useState<boolean>(false);

    const [errors, setErrors] = useState<Errors> ({
        errorContent: true,
        errorFile: false,
    });

    // Check input content
    const checkInput = (value: string):void => {
        Security.checkValidity(value, REGEX_TEXTE, 'errorContent', setErrors)
    }

    // Set le file
    const checkFile = (e:React.ChangeEvent<HTMLInputElement>):void => {

        if (e.target.files && e.target.files[0]) {           
            const file = e.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            
                if (allowedTypes.includes(file.type)) {        
                    setFile(file);
                    setErrors(prevError => ({
                        ...prevError,
                        errorFile: false,
                    }));
                } else {
                    console.error('Type de fichier non valide.');
                    setErrors(prevError => ({
                        ...prevError,
                        errorFile: true,
                    }));
                }
            } else {
                setErrors(prevError => ({
                    ...prevError,
                    errorFile: true,
                }));
        }
    }
 
    // Permet d'envoyer le formulaire
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
       
        e.preventDefault();
        
        if (!errors.errorContent && !errors.errorFile && id_user && token) {
            const newPost: newPost = {
                content,
                media: file
            };

            await PostController.createPost(newPost, Number(id_user), token);
            setContent('');
            setFile(null);
            
        } else {
            console.log('input pas OK');
        }
    }

  return (
    <>
        <section className={Style.sectionPost}>
            <form className={`${Style.formPost} form`}>
                <div className={Style.contentDiv}>
                    <div className={`${Style.group} form-group`}>
                        <textarea  
                            className={`${Style.input}  ${((errors.errorContent && isClick) ? 'bad-input' : '')}`} 
                            value={content}
                            required
                            placeholder=" "
                            id='content'
                            onChange={(e) => {setContent(e.target.value); checkInput(e.target.value)}}
                        />
                        <label className={''} htmlFor="content">Votre message </label>
                    </div>
                    <div className="">
                        <input 
                            className={Style.inputFile} 
                            type="file" 
                            id="files"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={(e) => checkFile(e)}
                        />
                        <label className={`${Style.label} ${(errors.errorFile && isClick) ? 'bad-input-icon' : ''} ${(file !== null) && 'good-input-icon'}`} htmlFor="files"><FontAwesomeIcon className={Style.icon} icon={faFile}/></label>
                    </div>
                </div>
                <button className='' onClick={(e) => {handleClick(e); setIsClick(true)}}><FontAwesomeIcon className={Style.icon} icon={faPaperPlane}/></button>
            </form>
        </section>
    </>
    ) ;
};

export default CreatePost;
