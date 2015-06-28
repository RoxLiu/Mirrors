package com.rox.app.mirrors.web.controller;

import com.rox.app.mirrors.core.entity.PostItem;
import com.rox.app.mirrors.web.service.PostItemService;
import com.rox.app.mirrors.web.util.Servlets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import java.util.Map;

@Controller
@RequestMapping("/post")
public class PostItemController {
    @Autowired
    private PostItemService authorService = null;

    @RequestMapping("/smith")
    public ModelAndView postListView(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
                                     @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, Model model, ServletRequest request) {
            ModelAndView mv = new ModelAndView("/post/post_list");

            Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

            Page<PostItem> pager = authorService.loadPostItemByCondition(searchParams, pageNumber, pageSize);
            // 将数据放到前台
            model.addAttribute("pager", pager);
            model.addAttribute("pageSize", pageSize);

            return mv;
        }
}
