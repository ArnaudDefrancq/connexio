import * as React from 'react';
import Style from './CreatePost.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFile } from '@fortawesome/free-solid-svg-icons';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICreatePostProps {
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
  return (
    <>
        <section className={Style.sectionPost}>
            <form className={`${Style.formPost} form`}>
                <div className={Style.contentDiv}>
                    <div className={`${Style.group} form-group`}>
                        <textarea 
                            className={`${Style.input}}`} 
                            required
                            placeholder=" "
                            id='content'
                        />
                        <label className={''} htmlFor="content">Votre message </label>
                    </div>
                    <div className="">
                        <input 
                            className={Style.input} 
                            type="file" 
                            id="files"
                        />
                        <label className={Style.label} htmlFor="files"><FontAwesomeIcon className={Style.icon} icon={faFile}/></label>
                    </div>
                </div>
                <button className=''><FontAwesomeIcon className={Style.icon} icon={faPaperPlane}/></button>
            </form>
        </section>
    </>
    ) ;
};

export default CreatePost;
