import React from 'react';
    import {
      SocialLink
    } from '../types';

    interface SocialLinksProps {
      links: SocialLink[];
    }

    export const SocialLinks: React.FC < SocialLinksProps > = ({
      links
    }) => {
      const getPlatformColor = (platform: string) => {
        switch (platform.toLowerCase()) {
          case 'twitter':
            return 'text-blue-500 hover:text-blue-600';
          case 'facebook':
            return 'text-blue-700 hover:text-blue-800';
          case 'instagram':
            return 'text-pink-500 hover:text-pink-600';
          case 'telegram':
            return 'text-blue-400 hover:text-blue-500';
          case 'website':
            return 'text-gray-600 hover:text-gray-700';
          default:
            return 'text-gray-500 hover:text-gray-600';
        }
      };

      return ( <
        div className = "flex flex-wrap gap-2" > {
          links.map((link, index) => ( <
            a key = {
              index
            }
            href = {
              link.url
            }
            target = "_blank"
            rel = "noopener noreferrer"
            className = {
              `flex items-center gap-1 px-3 py-1.5 bg-white bg-opacity-60 hover:bg-opacity-80 rounded-full text-sm font-medium transition-all ${getPlatformColor(link.platform)}`
            } >
            <
            span className = "capitalize" > {
              link.platform
            } < /span> {
              link.count && ( <
                span className = "text-xs opacity-75" > + {
                  link.count
                } < /span>
              )
            } <
            /a>
          ))
        } <
        /div>
      );
    };
