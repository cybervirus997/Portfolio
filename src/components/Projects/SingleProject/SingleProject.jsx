import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FaPlay, FaCode } from "react-icons/fa";
import Fade from 'react-reveal/Fade';


import placeholder from '../../../assets/png/placeholder.png'
import './SingleProject.css'

function SingleProject({ id, name, desc, tags, code, demo, image, theme,logos }) {

    const useStyles = makeStyles((t) => ({
        iconBtn : {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40, 
            height: 40,
            borderRadius: 50,
            border: `2px solid ${theme.tertiary}`,
            color: theme.tertiary,
            transition: 'all 0.2s',
            "&:hover": {
                backgroundColor: theme.secondary,
                color: theme.primary,
                transform: 'scale(1.1)',
                border: `2px solid ${theme.secondary}`,
            },
        },
        icon: {
            fontSize: '1.1rem',
            transition: 'all 0.2s',
            "&:hover": {

            },
        },
    }));

    const classes = useStyles();


    return (
        <Fade bottom>
            <div key={id} className="singleProject" style={{backgroundColor: theme.primary400}}>
                <div className="projectContent">
                    <h2 style={{color: theme.tertiary}}>{name}</h2>
                    <img src={image ? image : placeholder} alt={name} />
                     <p className="project--desc" style={{background: theme.secondary, color: theme.tertiary}}>
                    {desc}
                    </p>
                    <div className="project--lang" style={{marginBottom: "0",paddingBottom:"0", alignItems: 'center',display:"flex",flexFlow:"column",background: theme.secondary, color: theme.tertiary80 }}>

                        <div>
                            <p style={{ fontSize:"16px",marginBottom: "0",paddingBottom:"0"}}> Tech Stack used :</p>
                        </div>
                         
                        <div style={{ width:"80%",display:"flex",flexFlow:"row",justifyContent:"space-evenly" }}>

                            {logos.map((logo, id) => (
                            <span key={id}>
                                    <i class={logo}></i> 
                            </span>
                         ))}

                        </div>
                        
                </div>
                    <div className="project--showcaseBtn" style={{paddingBottom:"10px"}}>
                        <a href={demo} target="_blank" rel="noreferrer" className={classes.iconBtn}>
                            <FaPlay className={classes.icon}/>
                        </a>
                        <a href={code} target="_blank" rel="noreferrer" className={classes.iconBtn}>
                            <FaCode className={classes.icon}/>
                        </a>
                    </div>
                </div>
               
               
            </div>
        </Fade>
    )
}

export default SingleProject
