import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import { ThemeContext } from '../../contexts/ThemeContext';
import './Experience.css'

function ExperienceCard({id, company, jobtitle, startYear, endYear, location, duration, logo, skills, highlights}) {

    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        experienceCard : {
            backgroundColor:theme.primary30,
            "&:hover": {
                backgroundColor:theme.primary50,
            },
        },
        logo: {
            width: '50px',
            height: '50px',
            borderRadius: '8px',
            objectFit: 'contain',
            backgroundColor: theme.secondary,
            padding: '4px',
        },
        skillsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '8px',
        },
        skillTag: {
            backgroundColor: theme.primary30,
            color: theme.primary,
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 500,
        },
        highlight: {
            marginLeft: '20px',
            fontSize: '0.9rem',
            color: theme.tertiary80,
            lineHeight: '1.4',
        }
    }));

    const classes = useStyles();

    return (
        <Fade bottom>
            <div key={id} className={`experience-card ${classes.experienceCard}`}>
                <div className="expcard-header" style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                    {logo && (
                        <img src={logo} alt={company} className={classes.logo} onError={(e) => {e.target.style.display = 'none'}} />
                    )}
                    <div className="experience-details" style={{flex: 1}}>
                        <h6 style={{color: theme.primary, margin: '0 0 4px 0'}}>{startYear} {endYear ? `- ${endYear}` : ''}</h6>
                        {duration && <h6 style={{color: theme.tertiary80, margin: '0 0 8px 0', fontSize: '0.85rem'}}>({duration})</h6>}
                        <h4 style={{color: theme.tertiary, margin: '0 0 4px 0'}}>{jobtitle}</h4>
                        <h5 style={{color: theme.tertiary80, margin: '0 0 4px 0'}}>{company}</h5>
                        {location && <h6 style={{color: theme.tertiary80, fontSize: '0.85rem', margin: '0'}}>{location}</h6>}
                    </div>
                </div>
                
                {skills && skills.length > 0 && (
                    <div className={classes.skillsContainer}>
                        {skills.map((skill, idx) => (
                            <span key={idx} className={classes.skillTag}>{skill}</span>
                        ))}
                    </div>
                )}
                
                {highlights && highlights.length > 0 && (
                    <div style={{marginTop: '12px'}}>
                        {highlights.map((highlight, idx) => (
                            <p key={idx} className={classes.highlight}>• {highlight}</p>
                        ))}
                    </div>
                )}
            </div>
        </Fade>   
    )
}

export default React.memo(ExperienceCard)