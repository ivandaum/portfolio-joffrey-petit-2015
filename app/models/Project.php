<?php
class ProjectModel {
    public function __construct() {}

    static public function getAll()
    {
        $query = [
            'post_type' => 'post',
            'posts_per_page' => -1,
            'post_status' => 'publish'
        ];

        $query = new WP_Query($query);
        $projects = $query->posts;
        $formatedProjects = self::formatProject($projects);
        return $formatedProjects;
    }

    static public function get($count)
    {
        $query = [
            'post_type' => 'post',
            'posts_per_page' => $count,
            'post_status' => 'publish'
        ];

        $query = new WP_Query($query);
        $projects = $query->posts;
        $formatedProjects = self::formatProject($projects);
        return $formatedProjects;
    }

    static public function formatProject($projects)
    {
        $formatedProjects = array();

        $number = 1;

        foreach($projects as $key => $project) {
            $formatedProject = array();
            $formatedProject['id'] = $project->ID;
            $formatedProject['title'] = $project->post_title;
            $formatedProject['link'] = get_permalink($project->ID);
            $formatedProject['slug'] = $project->post_name;
            $formatedProject['description'] = $project->post_excerpt;
            $formatedProject['has_description'] = !empty($project->post_excerpt);

            $formatedProject['image'] = array(
                'full' => wp_get_attachment_image_src( get_post_thumbnail_id($project->ID), 'full' )[0],
                'medium' => wp_get_attachment_image_src( get_post_thumbnail_id($project->ID), 'image-preview' )[0],
                'small' => wp_get_attachment_image_src( get_post_thumbnail_id($project->ID), 'thumbnail' )[0]
            );

            $formatedProject['content'] = $project->post_content;
            $formatedProject['has_content'] = !empty($project->post_content);

            $tags =  wp_get_post_tags($project->ID);
            foreach($tags as $tag) {
                $formatedProject['tags'][] = $tag->name;
            }
            $formatedProject['has_tags'] = count($formatedProject['tags']) > 0;
            $formatedProject['number'] = $number;

            $formatedProjects[] = $formatedProject ;
            $number++;
        }

        return $formatedProjects;

    }
}