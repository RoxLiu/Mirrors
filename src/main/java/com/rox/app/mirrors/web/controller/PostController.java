package com.rox.app.mirrors.web.controller;

import com.rox.app.mirrors.core.entity.PostItem;
import com.rox.app.mirrors.web.service.PostService;
import com.rox.app.mirrors.web.util.Servlets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import java.util.Map;

@Controller
public class PostController extends BaseController{
    @Autowired
    private PostService postService = null;

    @RequestMapping("/post/smith")
    public ModelAndView createIndexView(Model model, ServletRequest request) {
        ModelAndView mv = new ModelAndView("/post/post_list");

        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

        Page<PostItem> pager = postService.loadPostItemByCondition(searchParams, 1, 100);
        // 将数据放到前台
        model.addAttribute("pager", pager);
        model.addAttribute("pageSize", 100);

        return mv;
    }

    @RequestMapping("/post/smith/{page}")
    public ModelAndView createPostView(@PathVariable("page") int page, Model model, ServletRequest request) {
        ModelAndView mv = new ModelAndView("/post/post_list");

        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

        Page<PostItem> pager = postService.loadPostItemByCondition(searchParams, page, 100);
        // 将数据放到前台
        model.addAttribute("pager", pager);
        model.addAttribute("pageSize", 100);

        return mv;
    }
}
