import * as React from 'react';
import Style from './CreatePost.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFile } from '@fortawesome/free-solid-svg-icons';
import { Security } from '../../../Tools/Security';
import { REGEX_TEXTE } from '../../../Tools/config';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreatePostProps {
}

type Errors = {
    errorContent: boolean,
    errorFile: boolean,
  }

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
    const [content, setContent] = useState<string>("")
    const [file, setFile] = useState<File| null>(null)

    const [errors, setErrors] = useState<Errors> ({
        errorContent: false,
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
            setFile(file);
            setErrors(prevError => ({
                ...prevError,
                errorFile: false
            }));
        } else {
            setErrors(prevError => ({
                ...prevError,
                errorFile: true
            }));
        }
    }
 
    // Permet d'envoyer le formulaire
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>):void => {
        checkInput(content); 
        e.preventDefault();
        setTimeout(() => {
            console.log(errors.errorContent);
            if (!errors.errorContent && !errors.errorFile) {
                console.log('bon');
                
            } else {
                console.log('input pas OK');
            }
        }, 1000)
    }

  return (
    <>
        <section className={Style.sectionPost}>
            <form className={`${Style.formPost} form`}>
                <div className={Style.contentDiv}>
                    <div className={`${Style.group} form-group`}>
                        <textarea  
                            className={`${Style.input}  ${(errors.errorContent ? 'bad-input' : '')}`} 
                            required
                            placeholder=" "
                            id='content'
                            onChange={(e) => {setContent(e.target.value)}}
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
                        <label className={`${Style.label} ${(errors.errorFile) ? 'bad-input-icon' : ''}}`} htmlFor="files"><FontAwesomeIcon className={Style.icon} icon={faFile}/></label>
                    </div>
                </div>
                <button className='' onClick={(e) => handleClick(e)}><FontAwesomeIcon className={Style.icon} icon={faPaperPlane}/></button>
            </form>
        </section>
    </>
    ) ;
};

export default CreatePost;
